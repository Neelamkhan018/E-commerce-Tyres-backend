import mongoose from "mongoose";
import BatteryModel from "../Models/BatteryModel.js"; // Import the BatteryModel




import upload from "../utils/upload.js"







// Post API for BatteryModel
const batteryModelFunction = async (req, res) => {
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

    // Create new battery model
    const newBatteryModel = new BatteryModel({
      name,
      slug,
      description,
      image: imageUrls,
      brand_id: brandid,
    });

    try {
      await newBatteryModel.save();
      res.status(201).json({ message: "Battery model added successfully" });
    } catch (err) {
      console.error('Error saving battery model:', err);
      res.status(500).json({ message: "Error saving battery model" });
    }
  });
};




// Get API for BatteryModel
const batteryModelGetFunction = async (req, res) => {
  try {
    const brandIds = req.query.brandid;

    if (!brandIds) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid brand ID(s)" });
    }

    const batteryModels = await BatteryModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true,
    });

    res.status(200).json(batteryModels);
  } catch (err) {
    console.error("Error fetching battery models:", err);
    res.status(500).json({ message: "Error fetching battery models" });
  }
};






// Update Battery Model
const batteryModelUpdateFunction = async (req, res) => {
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
      const updatedBatteryModel = await BatteryModel.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedBatteryModel) {
        return res.status(404).json({ error: 'Battery model not found' });
      }

      res.status(200).json({
        message: 'Battery model updated successfully',
        updatedBatteryModel,
      });
    } catch (error) {
      console.error('Error updating battery model:', error);
      res.status(500).json({ error: 'Failed to update battery model' });
    }
  });
};







// Delete API for BatteryModel
const batteryModelDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBatteryModel = await BatteryModel.findByIdAndDelete(id);

    if (!deletedBatteryModel) {
      return res.status(404).json({ error: 'Battery model not found' });
    }

    res.status(200).json({ message: 'Battery model deleted successfully', deletedBatteryModel });
  } catch (error) {
    console.error('Error deleting battery model:', error);
    res.status(500).json({ error: 'Failed to delete Battery model' });      
    }
  }
  

  
  // Get Single Battery Model API
  const batteryEditGetFunction = async (req, res) => {
    try {
      const batteryModel = await BatteryModel.findById(req.params.id);
      if (!batteryModel) {
        return res.status(404).json({ message: 'Battery model not found' });
      }
      res.json(batteryModel);
    } catch (error) {
      console.error('Error fetching battery model:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
  
  // Update Active Status API
  const activeBatteryModel = async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
  
      const model = await BatteryModel.findByIdAndUpdate(
        id,
        { active },
        { new: true }
      );
  
      if (!model) {
        return res.status(404).json({ error: 'Battery model not found' });
      }
  
      res.json(model);
    } catch (error) {
      console.error('Failed to update active status:', error);
      res.status(500).json({ error: 'Failed to update active status' });
    }
  }
  
  export {
    batteryModelFunction,
    batteryModelGetFunction,
    batteryModelUpdateFunction,
    batteryModelDeleteFunction,
    batteryEditGetFunction,
    activeBatteryModel
  }