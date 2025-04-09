import TractorBrand from "../Models/TractorBrand.js";
import multer from "multer";
import path from "path";
import { TractorTyre } from "../Models/adminModel.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('image', 10);

// Add Tractor Brand
const tractorAddFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ message: "Error uploading image" });

    const { name, slug, description } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageNames = req.files.map(file => file.filename);

    const newTractorBrand = new TractorBrand({
      name,
      slug,
      description,
      image: imageNames
    });

    try {
      await newTractorBrand.save();
      res.status(201).json({ message: "Tractor brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving tractor brand" });
    }
  });
};

// Get all Tractor Brands
const tractorGetFunction = async (req, res) => {
  try {
    const brands = await TractorBrand.find();
    res.status(200).json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tractor brands" });
  }
};

// Get one Tractor Brand
const tractorbrandGetFunction = async (req, res) => {
  try {
    const brand = await TractorBrand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Tractor brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Error fetching tractor brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Update Tractor Brand
const tractorUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ message: "Error uploading image" });

    const { id } = req.params;
    const { name, slug, description } = req.body;

    try {
      const existingBrand = await TractorBrand.findById(id);
      if (!existingBrand) return res.status(404).json({ error: 'Tractor brand not found' });

      let imageNames = existingBrand.image;
      if (req.files && req.files.length > 0) {
        imageNames = req.files.map(file => file.filename);
      }

      const updatedBrand = await TractorBrand.findByIdAndUpdate(
        id,
        { name, slug, description, image: imageNames },
        { new: true }
      );

      res.status(200).json({ message: 'Tractor brand updated successfully', updatedBrand });
    } catch (error) {
      console.error('Error updating tractor brand:', error);
      res.status(500).json({ error: 'Failed to update tractor brand' });
    }
  });
};

// Delete Tractor Brand
const tractorDeleteFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await TractorBrand.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Tractor brand not found' });

    res.status(200).json({ message: 'Tractor brand deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting tractor brand:', error);
    res.status(500).json({ error: 'Failed to delete tractor brand' });
  }
};

// Count Tractor Models per Brand
const countTractorFunction = async (req, res) => {
  try {
    const brands = await TractorBrand.aggregate([
      {
        $lookup: {
          from: 'tractormodels',
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
          active: 1,
          modelCount: 1
        }
      }
    ]);

    res.json(brands);
  } catch (error) {
    console.error('Error fetching tractor brands:', error);
    res.status(500).json({ message: 'Error fetching tractor brands', error });
  }
};

// Set Active/Inactive Tractor Brand
const activeTractorBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updated = await TractorBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Tractor brand not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
};

// Get Tractor Tyres by Brand
const getForTractor = async (req, res) => {
  try {
    const { brandId } = req.params;

    const tyres = await TractorTyre.find({
      $or: [
        { tractorBrand: brandId },
        { tyreBrand: brandId },
      ],
    });

    if (!tyres || tyres.length === 0) {
      return res.status(404).json({ message: 'No tractor tyres found for this brand' });
    }

    res.status(200).json({
      brandId: brandId,
      tyres: tyres,
    });
  } catch (error) {
    console.error('Error fetching tractor tyres by brand:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  tractorAddFunction,
  tractorGetFunction,
  tractorUpdateFunction,
  tractorDeleteFunction,
  tractorbrandGetFunction,
  countTractorFunction,
  activeTractorBrand,
  getForTractor
};
