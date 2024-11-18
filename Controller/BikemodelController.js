
import mongoose from "mongoose";
import BikeModel from "../Models/BikeModel.js";

import multer from "multer";
import path from "path";

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

// Post API
const bikeModelFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err); // Log multer error
      return res.status(500).json({ message: "Error uploading image" });
    }

    console.log('Form data:', req.body);
    console.log('Uploaded files:', req.files); // Log uploaded files

    const { name, slug, description, brandid } = req.body;

    // console.log(req.body);
    

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageNames = req.files.map(file => file.filename);

    // Create new bike model
    const newBikeModel = new BikeModel({
      name,
      slug,
      description,
      image: imageNames ,
      brand_id:brandid
    });

    try {
      await newBikeModel.save();
      res.status(201).json({ message: "Bike model added successfully" });
    } catch (err) {
      console.error('Error saving bike model:', err); // Log saving error
      res.status(500).json({ message: "Error saving bike model" });
    }
  });
}

// Get API
const bikeModelGetFunction = async (req, res) => {
  

  try {
    const brandIds = req.query.brandid;
    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid brand ID(s)' });
    }

    const bikeModels = await BikeModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true,
    });

    res.status(200).json(bikeModels);
  } catch (err) {
    console.error('Error fetching bike models:', err);
    res.status(500).json({ message: 'Error fetching bike models' });
  }


}



// Update API
const bikeModelUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err); // Log multer error
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    let updatedFields = { name, slug, description };

    if (req.files && req.files.length > 0) {
      const imageNames = req.files.map(file => file.filename);
      updatedFields.image = imageNames;
    }

    try {
      const updatedBikeModel = await BikeModel.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true } // Return the updated document
      );

      if (!updatedBikeModel) {
        return res.status(404).json({ error: 'Bike model not found' });
      }

      res.status(200).json({ message: 'Bike model updated successfully', updatedBikeModel });
    } catch (error) {
      console.error('Error updating bike model:', error);
      res.status(500).json({ error: 'Failed to update bike model' });
    }
  });
}

// Delete API
const bikeModelDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBikeModel = await BikeModel.findByIdAndDelete(id);

    if (!deletedBikeModel) {
      return res.status(404).json({ error: 'Bike model not found' });
    }

    res.status(200).json({ message: 'Bike model deleted successfully', deletedBikeModel });
  } catch (error) {
    console.error('Error deleting bike model:', error);
    res.status(500).json({ error: 'Failed to delete bike model' });
  }
}

const bikeEditGetFunction = async (req,res)=>{

  try {
    const bikeBrand = await BikeModel.findById(req.params.id);
    if (!bikeBrand) {
      return res.status(404).json({ message: 'Car brand not found' });
    }
    res.json(bikeBrand);
  } catch (error) {
    console.error('Error fetching car brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}


const ActiveBikeModel = async (req,res)=>{


  try {
    const { id } = req.params;
    const { active } = req.body;

    const model= await BikeModel.findByIdAndUpdate(
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

export {
  bikeModelFunction,
  bikeModelGetFunction,
  bikeModelUpdateFunction,
  bikeModelDeleteFunction,
  bikeEditGetFunction,
  ActiveBikeModel
}
