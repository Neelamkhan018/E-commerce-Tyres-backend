import TyreBrand from "../Models/TyreModel.js";
import multer from "multer";
import path from "path"

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  }
});

// Initialize multer for image upload (allowing up to 10 images)
const upload = multer({ storage: storage }).array('image', 10);

const tyreFunction = async (req, res) => {

  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Get image filenames
    const imageNames = req.files.map(file => file.filename);

    // Create new tyre brand
    const newTyreBrand = new TyreBrand({
      name,
      slug,
      description,
      image: imageNames // Save uploaded images
    });

    try {
      // Save tyre brand to database
      await newTyreBrand.save();
      res.status(201).json({ message: "Tyre brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving tyre brand" });
    }
  });
  }

  const tyreGetFunction = async (req,res)=>{
    try {
      const tyreBrands = await TyreBrand.find(); // Fetch all tyre brands from the database
      res.status(200).json(tyreBrands); // Send response with the tyre brand data
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching tyre brands" });
    }
  }



  
  const tyreDeleteFunction = async (req,res)=>{
    const { id } = req.params;

  try {
    const deletedBrand = await TyreBrand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Tyre brand not found' });
    }

    res.status(200).json({ message: 'Tyre brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error('Error deleting tyre brand:', error);
    res.status(500).json({ error: 'Failed to delete tyre brand' });
  }
  }




  const tyreUpdateFunction = async (req,res)=>{

    // const { id } = req.params;
    // const { name, slug, description, image } = req.body;
  
    // try {
    //   const updatedBrand = await TyreBrand.findByIdAndUpdate(
    //     id, 
    //     { name, slug, description, image }, 
    //     { new: true } // Return the updated document
    //   );
  
    //   if (!updatedBrand) {
    //     return res.status(404).json({ error: 'Tyre brand not found' });
    //   }
  
    //   res.status(200).json({ message: 'Tyre brand updated successfully', updatedBrand });
    // } catch (error) {
    //   console.error('Error updating tyre brand:', error);
    //   res.status(500).json({ error: 'Failed to update tyre brand' });
    // }

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ message: "Error uploading image" });
      }
  
      const { id } = req.params;
      const { name, slug, description } = req.body;
  
      let imageNames = req.body.image || []; // Use existing images if no new ones are uploaded
  
      if (req.files && req.files.length > 0) {
        imageNames = req.files.map(file => file.filename); // Update with new images if any
      }
  
      try {
        const updatedBrand = await TyreBrand.findByIdAndUpdate(
          id,
          { name, slug, description, image: imageNames },
          { new: true }
        );
  
        if (!updatedBrand) {
          return res.status(404).json({ error: 'Tyre brand not found' });
        }
  
        res.status(200).json({ message: 'Tyre brand updated successfully', updatedBrand });
      } catch (error) {
        console.error('Error updating tyre brand:', error);
        res.status(500).json({ error: 'Failed to update tyre brand' });
      }
    });

  
    
  }
 
  const tyreeditGetFunction = async(req,res)=>{
    try {
      const tyreBrand = await TyreBrand.findById(req.params.id);
      if (!tyreBrand) {
        return res.status(404).json({ message: 'tyre brand not found' });
      }
      res.json(tyreBrand);
    } catch (error) {
      console.error('Error fetching car brand:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }


 const tyreactive = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updatedBrand = await TyreBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


const GettyreFunction = async (req,res)=>{

  // const { id } = req.params;

  // try {
  //   // Find the tyre brand by its ID
  //   const tyreBrand = await TyreBrand.findById(id);

  //   if (!tyreBrand) {
  //     return res.status(404).json({ message: "Tyre brand not found" });
  //   }

  //   // Map image filenames to full URLs
  //   const imageUrls = tyreBrand.image.map(filename => `${req.protocol}://${req.get('host')}/uploads/tyrebrands/${filename}`);

  //   // Send the tyre brand data, including the image URLs
  //   res.status(200).json({
  //     name: tyreBrand.name,
  //     slug: tyreBrand.slug,
  //     description: tyreBrand.description,
  //     image: imageUrls, // Array of full image URLs
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: "Error fetching tyre brand" });
  // }

  

  const { id } = req.params;
  try {
    const tyreBrand = await TyreBrand.findById(id); // Find tyreBrand by ID
    if (!tyreBrand) {
      return res.status(404).json({ message: 'Tyre brand not found' });
    }

    res.json({ image: tyreBrand.image }); // Return the image URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

  export  {
    tyreFunction,
    tyreGetFunction,
    tyreDeleteFunction,
    tyreUpdateFunction,
    tyreeditGetFunction,
    tyreactive,
    GettyreFunction
    
  }