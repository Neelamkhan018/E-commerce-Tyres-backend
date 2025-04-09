import mongoose from "mongoose";
import TractorModel from "../Models/TractorModel.js";

import multer from "multer";
import path from "path";

const ObjectId = mongoose.Types.ObjectId;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('image', 10);

// POST - Add Tractor Model
const tractorModelFunction = async (req, res) => {
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

    const newTractorModel = new TractorModel({
      name,
      slug,
      description,
      image: imageNames,
      brand_id: brandid
    });

    try {
      await newTractorModel.save();
      res.status(201).json({ message: "Tractor model added successfully" });
    } catch (err) {
      console.error('Error saving tractor model:', err);
      res.status(500).json({ message: "Error saving tractor model" });
    }
  });
};

// GET - Fetch Tractor Models by Brand
const tractorModelGetFunction = async (req, res) => {
  try {
    const brandIds = req.query.brandid;

    if (!brandIds) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid brand ID(s)" });
    }

    const tractorModels = await TractorModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true,
    });

    res.status(200).json(tractorModels);
  } catch (err) {
    console.error("Error fetching tractor models:", err);
    res.status(500).json({ message: "Error fetching tractor models" });
  }
};

// PUT - Update Tractor Model
const tractorModelUpdateFunction = async (req, res) => {
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
      const updatedTractorModel = await TractorModel.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
      );

      if (!updatedTractorModel) {
        return res.status(404).json({ error: 'Tractor model not found' });
      }

      res.status(200).json({ message: 'Tractor model updated successfully', updatedTractorModel });
    } catch (error) {
      console.error('Error updating tractor model:', error);
      res.status(500).json({ error: 'Failed to update tractor model' });
    }
  });
};

// DELETE - Delete Tractor Model
const tractorModelDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTractorModel = await TractorModel.findByIdAndDelete(id);

    if (!deletedTractorModel) {
      return res.status(404).json({ error: 'Tractor model not found' });
    }

    res.status(200).json({ message: 'Tractor model deleted successfully', deletedTractorModel });
  } catch (error) {
    console.error('Error deleting tractor model:', error);
    res.status(500).json({ error: 'Failed to delete tractor model' });
  }
};

// GET - Get Single Tractor Model
const tractorEditGetFunction = async (req, res) => {
  try {
    const tractorModel = await TractorModel.findById(req.params.id);
    if (!tractorModel) {
      return res.status(404).json({ message: 'Tractor model not found' });
    }
    res.json(tractorModel);
  } catch (error) {
    console.error('Error fetching tractor model:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// PATCH - Update Active Status
const ActiveTractorModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const model = await TractorModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!model) {
      return res.status(404).json({ error: 'Tractor model not found' });
    }

    res.json(model);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
};

export {
  tractorModelFunction,
  tractorModelGetFunction,
  tractorModelUpdateFunction,
  tractorModelDeleteFunction,
  tractorEditGetFunction,
  ActiveTractorModel
};
