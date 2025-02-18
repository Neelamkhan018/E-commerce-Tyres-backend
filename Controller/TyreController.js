import TyreBrand from "../Models/TyreModel.js";
import multer from "multer";
import path from "path"
import { BikeTyre, CarTyre } from "../Models/adminModel.js";

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



const getForTyre = async (req, res) => {
  try {
    // Extract the brand ID from the request parameters
    const { brandId } = req.params;
    console.log('Request Params:', req.params); // Debugging: Log the incoming brandId

    // Find car tyres where the tyreBrand matches the brandId
    const carTyres = await CarTyre.find({ tyreBrand: brandId });

    // Find bike tyres where the tyreBrand matches the brandId
    const bikeTyres = await BikeTyre.find({ tyreBrand: brandId });

    // Log the tyreBrand IDs from the car and bike tyres
    carTyres.forEach((tyre) => {
      console.log('Car Tyre Brand ID:', tyre.tyreBrand); // This will log the ObjectId
    });

    bikeTyres.forEach((tyre) => {
      console.log('Bike Tyre Brand ID:', tyre.tyreBrand); // This will log the ObjectId
    });

    // Check if any tyres were found
    if (!carTyres.length && !bikeTyres.length) {
      return res.status(404).json({ message: 'No tyres found for the specified brand' });
    }

    // Send the response with the found tyres (both car and bike tyres)
    return res.status(200).json({
      carTyres,
      bikeTyres,
    });

  } catch (error) {
    console.error('Error fetching tyres for the brand:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// const getForTyre = async (req, res) => {
//   try {
//       const { brandId } = req.params;
      
//       let carTyres = [];
//       let bikeTyres = [];

//       if (brandId === "All") {
//           // Fetch all active tyres and populate brand details
//           carTyres = await CarTyre.find({ active: true }).populate("tyreBrand");
//           bikeTyres = await BikeTyre.find({ active: true }).populate("tyreBrand");
//       } else {
//           // Fetch tyres matching the brand ID
//           carTyres = await CarTyre.find({ 
//               tyreBrand: brandId, // Now correctly matches ObjectId
//               active: true 
//           }).populate("tyreBrand");
          
//           bikeTyres = await BikeTyre.find({ 
//               tyreBrand: brandId, 
//               active: true 
//           }).populate("tyreBrand");
//       }

//       res.status(200).json({ carTyres, bikeTyres });
//   } catch (error) {
//       console.error("Error fetching tyres:", error);
//       res.status(500).json({ message: "Server error" });
//   }
// };


// const getForTyre = async (req, res) => {
//   try {
//     const { brandId } = req.params;

//     // Find tyres across both vehicle types that match the tyre brand
//     const carTyres = await CarTyre.find({ tyreBrand: { $in: [brandId] } });
//     const bikeTyres = await BikeTyre.find({ tyreBrand: { $in: [brandId] } });
    
//     const allTyres = [...carTyres, ...bikeTyres];

//     if (allTyres.length === 0) {
//       return res.status(404).json({ message: 'No tyres found for this tyre brand' });
//     }

//     return res.status(200).json({
//       count: allTyres.length,
//       tyres: allTyres,
//     });

//   } catch (error) {
//     console.error('Error fetching tyres by tyre brand:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


  export  {
    tyreFunction,
    tyreGetFunction,
    tyreDeleteFunction,
    tyreUpdateFunction,
    tyreeditGetFunction,
    tyreactive,
    GettyreFunction,
    getForTyre
  }