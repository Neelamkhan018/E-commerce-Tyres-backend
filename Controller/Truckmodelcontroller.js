import mongoose from "mongoose";
import TruckModel from "../Models/TruckModel.js";



import upload from "../utils/upload.js"



const truckModelFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description, brandid } = req.body;

    // Get uploaded images from 'image' field
    const imageFiles = req.files['image'] || [];

    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract hosted image URLs
    const imageUrls = imageFiles.map(file => file.location);

    // Create new truck model
    const newTruckModel = new TruckModel({
      name,
      slug,
      description,
      image: imageUrls,
      brand_id: brandid,
    });

    try {
      await newTruckModel.save();
      res.status(201).json({ message: "Truck model added successfully" });
    } catch (err) {
      console.error('Error saving truck model:', err);
      res.status(500).json({ message: "Error saving truck model" });
    }
  });
};


// // Get API

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
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    let imageUrls = [];

    // Handle existing image URLs from form (string or array)
    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        imageUrls = [req.body.image];
      } else if (Array.isArray(req.body.image)) {
        imageUrls = req.body.image;
      }
    }

    // Override with newly uploaded images if any
    const imageFiles = req.files['image'] || [];
    if (imageFiles.length > 0) {
      imageUrls = imageFiles.map(file => file.location);
    }

    try {
      const updatedTruckModel = await TruckModel.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedTruckModel) {
        return res.status(404).json({ error: 'Truck model not found' });
      }

      res.status(200).json({
        message: 'Truck model updated successfully',
        updatedTruckModel,
      });
    } catch (error) {
      console.error('Error updating truck model:', error);
      res.status(500).json({ error: 'Failed to update truck model' });
    }
  });
};





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
