import mongoose from "mongoose";
import TruckModel from "../Models/TruckModel.js";

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
const truckModelFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err); // Log multer error
      return res.status(500).json({ message: "Error uploading image" });
    }

    console.log('Form data:', req.body);
    console.log('Uploaded files:', req.files); // Log uploaded files

    const { name, slug, description, brandid } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageNames = req.files.map(file => file.filename);

    // Create new truck model
    const newTruckModel = new TruckModel({
      name,
      slug,
      description,
      image: imageNames,
      brand_id: brandid
    });

    try {
      await newTruckModel.save();
      res.status(201).json({ message: "Truck model added successfully" });
    } catch (err) {
      console.error('Error saving truck model:', err); // Log saving error
      res.status(500).json({ message: "Error saving truck model" });
    }
  });
}

// // Get API
// const truckModelGetFunction = async (req, res) => {
//   try {
//     const brandIds = req.query.brandid;
//     const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

//     if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
//       return res.status(400).json({ message: 'Invalid brand ID(s)' });
//     }

//     const truckModels = await TruckModel.find({
//       brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
//       active: true,
//     });

//     res.status(200).json(truckModels);
//   } catch (err) {
//     console.error('Error fetching truck models:', err);
//     res.status(500).json({ message: 'Error fetching truck models' });
//   }
// }


const truckModelGetFunction = async (req, res) => {
  try {
    const brandIds = req.query.brandid;

    if (!brandIds) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid brand ID(s)" });
    }

    const truckModels = await TruckModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true, // Ensure you're only fetching active models
    });

    res.status(200).json(truckModels);
  } catch (err) {
    console.error("Error fetching truck models:", err);
    res.status(500).json({ message: "Error fetching truck models" });
  }
};


// Update API
const truckModelUpdateFunction = async (req, res) => {
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
      const updatedTruckModel = await TruckModel.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true } // Return the updated document
      );

      if (!updatedTruckModel) {
        return res.status(404).json({ error: 'Truck model not found' });
      }

      res.status(200).json({ message: 'Truck model updated successfully', updatedTruckModel });
    } catch (error) {
      console.error('Error updating truck model:', error);
      res.status(500).json({ error: 'Failed to update truck model' });
    }
  });
}

// Delete API
const truckModelDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTruckModel = await TruckModel.findByIdAndDelete(id);

    if (!deletedTruckModel) {
      return res.status(404).json({ error: 'Truck model not found' });
    }

    res.status(200).json({ message: 'Truck model deleted successfully', deletedTruckModel });
  } catch (error) {
    console.error('Error deleting truck model:', error);
    res.status(500).json({ error: 'Failed to delete truck model' });
  }
}

// Get Single Truck Model API
const truckEditGetFunction = async (req, res) => {
  try {
    const truckModel = await TruckModel.findById(req.params.id);
    if (!truckModel) {
      return res.status(404).json({ message: 'Truck model not found' });
    }
    res.json(truckModel);
  } catch (error) {
    console.error('Error fetching truck model:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

// Update Active Status API
const ActiveTruckModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const model = await TruckModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!model) {
      return res.status(404).json({ error: 'Truck model not found' });
    }

    res.json(model);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
}

export {
  truckModelFunction,
  truckModelGetFunction,
  truckModelUpdateFunction,
  truckModelDeleteFunction,
  truckEditGetFunction,
  ActiveTruckModel
}
