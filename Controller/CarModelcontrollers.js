import mongoose from "mongoose";
import CarModel from "../Models/CarModel.js";



import upload from "../utils/upload.js"





const carModelFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description, brandid } = req.body;

    // Check for uploaded image files from 'image' field
    const imageFiles = req.files['image'] || [];

    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract image URLs (DigitalOcean / S3 format)
    const imageUrls = imageFiles.map(file => file.location);

    // Create new car model
    const newCarModel = new CarModel({
      name,
      slug,
      description,
      image: imageUrls,
      brand_id: brandid,
    });

    try {
      await newCarModel.save();
      res.status(201).json({ message: "Car model added successfully" });
    } catch (err) {
      console.error('Error saving car model:', err);
      res.status(500).json({ message: "Error saving car model" });
    }
  });
};





// get api
const carModelGetFunction = async (req,res)=>{

    try {
      // Extract brand IDs from query parameters
      const brandIds = req.query.brandid;
  
      // Check if brandIds is an array; if not, convert it to an array
      const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];
  
      // Validate brand IDs
      if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ message: 'Invalid brand ID(s)' });
      }
  
      // Find car models with the provided brand IDs and ensure they're active
      const carModels = await CarModel.find({
        brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
        active: true,  // Ensure only active models are returned
      });
  
      // Return the car models as a response
      res.status(200).json(carModels);
    } catch (err) {
      console.error('Error fetching car models:', err);
      res.status(500).json({ message: 'Error fetching car models' });
    }
    
}






const carModelupdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    let imageUrls = [];

    // Handle existing image URLs from the form
    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        imageUrls = [req.body.image];
      } else if (Array.isArray(req.body.image)) {
        imageUrls = req.body.image;
      }
    }

    // If new images are uploaded, override existing image URLs
    const imageFiles = req.files['image'] || [];
    if (imageFiles.length > 0) {
      imageUrls = imageFiles.map(file => file.location);
    }

    try {
      const updatedCarModel = await CarModel.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedCarModel) {
        return res.status(404).json({ error: 'Car model not found' });
      }

      res.status(200).json({
        message: 'Car model updated successfully',
        updatedCarModel,
      });
    } catch (error) {
      console.error('Error updating car model:', error);
      res.status(500).json({ error: 'Failed to update car model' });
    }
  });
};





// delete api

const carmodelDeleteFunction = async (req,res)=>{

    const { id } = req.params;

    try {
      const deletedBrand = await CarModel.findByIdAndDelete(id);
  
      if (!deletedBrand) {
        return res.status(404).json({ error: 'CarModel not found' });
      }
  
      res.status(200).json({ message: 'CarModel deleted successfully', deletedBrand });
    } catch (error) {
      console.error('Error deleting tyre brand:', error);
      res.status(500).json({ error: 'Failed to delete tyre brand' });
    }

}


const carModelEditFunction = async (req,res)=>{

  

  try {
    const carBrand = await CarModel.findById(req.params.id);
    if (!carBrand) {
      return res.status(404).json({ message: 'Car brand not found' });
    }
    res.json(carBrand);
  } catch (error) {
    console.error('Error fetching car brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }

}


const activeCarModel = async (req,res)=>{
  try {
    const { id } = req.params;
    const { active } = req.body;

    const model = await CarModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!model) {
      return res.status(404).json({ error: 'car brand not found' });
    }

    res.json(model);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
}


const CarModelGetIDFunction = async (req,res)=>{
  try {
    const { model_id } = req.params;

    // Validate the model_id
    if (!mongoose.Types.ObjectId.isValid(model_id)) {
      return res.status(400).json({ message: 'Invalid model ID' });
    }

    // Find the car model by its ID
    const carModel = await CarModel.findById(model_id);

    // If the car model is not found
    if (!carModel) {
      return res.status(404).json({ message: 'Car model not found' });
    }

    // Return the car model details as a response
    res.status(200).json(carModel);
  } catch (err) {
    console.error('Error fetching car model:', err);
    res.status(500).json({ message: 'Error fetching car model' });
  }
}



const modelGet = async (req,res)=>{
  try {
    const carmodel = await CarModel.find(); 
    res.status(200).json(carmodel); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tyre brands" });
  }
}


export{
    carModelFunction,
    carModelGetFunction,
    carModelupdateFunction,
    carmodelDeleteFunction,
    carModelEditFunction,
    activeCarModel,
    CarModelGetIDFunction,
    modelGet 

}
