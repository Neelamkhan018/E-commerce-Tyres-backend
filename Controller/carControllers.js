
import CarBrand from "../Models/CarBrand.js";
import multer from "multer";
import path from "path"



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
}); 


const upload = multer({ storage: storage }).array('image', 10);


const carAddFunction  = async (req,res)=>{
    upload(req, res, async function (err) {
        if (err) {
          return res.status(500).json({ message: "Error uploading image" });
        }
    
        const { name, slug, description, } = req.body;
    
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No images uploaded" });
        }
    
        
        const imageNames = req.files.map(file => file.filename);
    
        // Create new tyre brand
        const newTyreBrand = new CarBrand({
          name,
          slug,
          description,
          image: imageNames 
        });
    
        try {
         
          await newTyreBrand.save();
          res.status(201).json({ message: "Tyre brand added successfully" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Error saving tyre brand" });
        }
      });
}



// get api

const carGetFunction = async(req,res)=>{
    try {
        const carBrands = await CarBrand.find(); 
        res.status(200).json(carBrands); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching tyre brands" });
      }
}


// update api

const carUpdateFunction = async (req,res)=>{
   

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ message: "Error uploading image" });
      }
  
      const { id } = req.params;
      const { name, slug, description } = req.body;
  
      try {
        // Find the existing brand
        const existingBrand = await CarBrand.findById(id);
  
        if (!existingBrand) {
          return res.status(404).json({ error: 'Car brand not found' });
        }
  
        // Update the image field only if new files were uploaded
        let imageNames = existingBrand.image;
        if (req.files && req.files.length > 0) {
          imageNames = req.files.map(file => file.filename);
        }
  
        // Update the brand
        const updatedBrand = await CarBrand.findByIdAndUpdate(
          id,
          { name, slug, description, image: imageNames },
          { new: true } // Return the updated document
        );
  
        res.status(200).json({ message: 'Car brand updated successfully', updatedBrand });
      } catch (error) {
        console.error('Error updating car brand:', error);
        res.status(500).json({ error: 'Failed to update car brand' });
      }
    });

}

const carDeleteFunction = async (req,res)=>{
    const { id } = req.params;

  try {
    const deletedBrand = await CarBrand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Tyre brand not found' });
    }

    res.status(200).json({ message: 'Tyre brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error('Error deleting tyre brand:', error);
    res.status(500).json({ error: 'Failed to delete tyre brand' });
  }


}



const carbrandGetFunction = async (req,res)=>{
 
  try {
    const carbrand = await CarBrand.findById(req.params.id);
    if (!carbrand) {
      return res.status(404).json({ message: 'Car brand not found' });
    }
    res.json(carbrand);
  } catch (error) {
    console.error('Error fetching car brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}



const countFunction = async (req,res)=>{

  try {
    const carBrands = await CarBrand.aggregate([
      {
        $lookup: {
          from: 'carmodels', // Collection name in the database
          localField: '_id',
          foreignField: 'brand_id',
          as: 'models'
        }
      },
      {
        $addFields: {
          modelCount: { $size: '$models' }
        }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          description: 1,
          image: 1,
          isActive: 1,
          modelCount: 1 // Include model count in the result
        }
      }
    ]);

    console.log('Car Brands with Model Counts:', carBrands);

    res.json(carBrands);
  } catch (error) {
    // Log the error message
    console.error('Error fetching car brands:', error);
    res.status(500).json({ message: 'Error fetching car brands', error });
  }
 
}


const activeCarBrand = async (req,res)=>{

  try {
    const { id } = req.params;
    const { active } = req.body;

    const brand = await CarBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ error: 'car brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
}


export {
    carAddFunction,
    carGetFunction,
    carUpdateFunction,
    carDeleteFunction,
    carbrandGetFunction,
    countFunction,
    activeCarBrand
    
   
}