import mongoose from "mongoose";
import AccessoriesModel from "../Models/AccessoriesModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage }).array('image', 10);

// Add Accessory
const accessoriesAddFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description, brandid } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageNames = req.files.map(file => file.filename);

    const newAccessory = new AccessoriesModel({
      name,
      slug,
      description,
      image: imageNames,
      brand_id: brandid
    });

    try {
      await newAccessory.save();
      res.status(201).json({ message: "Accessory added successfully" });
    } catch (err) {
      console.error('Error saving accessory:', err);
      res.status(500).json({ message: "Error saving accessory" });
    }
  });
}

// Get Accessories by brand ID
const accessoriesGetFunction = async (req, res) => {
  try {
    const brandIds = req.query.brandid;

    if (!brandIds) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid brand ID(s)" });
    }

    const accessories = await AccessoriesModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true,
    });

    res.status(200).json(accessories);
  } catch (err) {
    console.error("Error fetching accessories:", err);
    res.status(500).json({ message: "Error fetching accessories" });
  }
};

// Update Accessory
const accessoriesUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
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
      const updatedAccessory = await AccessoriesModel.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
      );

      if (!updatedAccessory) {
        return res.status(404).json({ error: 'Accessory not found' });
      }

      res.status(200).json({ message: 'Accessory updated successfully', updatedAccessory });
    } catch (error) {
      console.error('Error updating accessory:', error);
      res.status(500).json({ error: 'Failed to update accessory' });
    }
  });
}

// Delete Accessory
const accessoriesDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccessory = await AccessoriesModel.findByIdAndDelete(id);

    if (!deletedAccessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }

    res.status(200).json({ message: 'Accessory deleted successfully', deletedAccessory });
  } catch (error) {
    console.error('Error deleting accessory:', error);
    res.status(500).json({ error: 'Failed to delete accessory' });      
  }
}

// Get Single Accessory
const accessoriesEditGetFunction = async (req, res) => {
  try {
    const accessory = await AccessoriesModel.findById(req.params.id);
    if (!accessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }
    res.json(accessory);
  } catch (error) {
    console.error('Error fetching accessory:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

// Update Active Status
const activeAccessoriesFunction = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const accessory = await AccessoriesModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!accessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }

    res.json(accessory);
  } catch (error) {
    console.error('Failed to update active status:', error);
    res.status(500).json({ error: 'Failed to update active status' });
  }
}

export {
  accessoriesAddFunction,
  accessoriesGetFunction,
  accessoriesUpdateFunction,
  accessoriesDeleteFunction,
  accessoriesEditGetFunction,
  activeAccessoriesFunction
};
