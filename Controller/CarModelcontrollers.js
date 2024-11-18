import mongoose from "mongoose";
import CarModel from "../Models/CarModel.js";

import multer from "multer";
import path from "path"


const ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage }).array('image', 10);

// post api
const carModelFunction = async (req,res)=>{
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err); // Log multer error
      return res.status(500).json({ message: "Error uploading image" });
    }

    console.log('Form data:', req.body);
    console.log('Uploaded files:', req.files); // Log uploaded files

    const { name, slug, description,brandid } = req.body;
    // console.log(req.body);
    

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageNames = req.files.map(file => file.filename);

    // Create new car model
    const newCarModel = new CarModel({
      name,
      slug,
      description,
      image: imageNames ,
      brand_id:brandid
    });

    try {
      await newCarModel.save();
      res.status(201).json({ message: "Car model added successfully" });
    } catch (err) {
      console.error('Error saving car model:', err); // Log saving error
      res.status(500).json({ message: "Error saving car model" });
    }
  });

}




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




// update api
const carModelupdateFunction = async (req,res)=>{

  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;
    
    try {
      // Find the existing car model by ID
      const existingCarModel = await CarModel.findById(id);
      if (!existingCarModel) {
        return res.status(404).json({ error: 'Car model not found' });
      }

      // If images are uploaded, replace the existing ones, else keep the existing images
      const imageNames = req.files && req.files.length > 0 ? req.files.map(file => file.filename) : existingCarModel.image;

      // Update the car model with new data
      existingCarModel.name = name || existingCarModel.name;
      existingCarModel.slug = slug || existingCarModel.slug;
      existingCarModel.description = description || existingCarModel.description;
      existingCarModel.image = imageNames;

      // Save the updated car model
      const updatedCarModel = await existingCarModel.save();

      res.status(200).json({ message: 'Car model updated successfully', updatedCarModel });
    } catch (error) {
      console.error('Error updating car model:', error);
      res.status(500).json({ error: 'Failed to update car model' });
    }
  });
}

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
