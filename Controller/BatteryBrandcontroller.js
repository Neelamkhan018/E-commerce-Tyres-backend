import BatteryBrand from "../Models/Batterybrand.js";

import { Battery } from "../Models/adminModel.js";

import upload from "../utils/upload.js"




// Add Battery Brand
const batteryAddFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description } = req.body;

    // Check if images are uploaded
    const imageFiles = req.files['image'] || [];

    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract hosted image URLs
    const imageUrls = imageFiles.map(file => file.location);

    // Create new battery brand
    const newBatteryBrand = new BatteryBrand({
      name,
      slug,
      description,
      image: imageUrls,
    });

    try {
      await newBatteryBrand.save();
      res.status(201).json({ message: "Battery brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving battery brand" });
    }
  });
};






// Get all Battery Brands
const batteryGetFunction = async (req, res) => {
  try {
    const brands = await BatteryBrand.find();
    res.status(200).json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching battery brands" });
  }
};

// Get one Battery Brand
const batteryBrandGetFunction = async (req, res) => {
  try {
    const brand = await BatteryBrand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Battery brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Error fetching battery brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};






// Update Battery Brand
const batteryUpdateFunction = async (req, res) => {
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
      const updatedBatteryBrand = await BatteryBrand.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedBatteryBrand) {
        return res.status(404).json({ error: 'Battery brand not found' });
      }

      res.status(200).json({
        message: 'Battery brand updated successfully',
        updatedBatteryBrand,
      });
    } catch (error) {
      console.error('Error updating battery brand:', error);
      res.status(500).json({ error: 'Failed to update battery brand' });
    }
  });
};




// Delete Battery Brand
const batteryDeleteFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await BatteryBrand.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Battery brand not found' });

    res.status(200).json({ message: 'Battery brand deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting battery brand:', error);
    res.status(500).json({ error: 'Failed to delete battery brand' });
  }
};

// Count Battery Models per Brand
const countBatteryFunction = async (req, res) => {
    try {
        const brands = await BatteryBrand.aggregate([
          {
            $lookup: {
              from: 'batterymodels',
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
        console.error('Error fetching battery brands:', error);
        res.status(500).json({ message: 'Error fetching battery brands', error });
      }
}


// Set Active/Inactive Battery Brand
const activeBatteryBrand = async (req, res) => {
try {
const { id } = req.params;
const { active } = req.body;

const updated = await BatteryBrand.findByIdAndUpdate(
id,
{ active },
{ new: true }
);

if (!updated) return res.status(404).json({ error: 'Battery brand not found' });

res.json(updated);
} catch (error) {
res.status(500).json({ error: 'Failed to update active status' });
}
};


// Get Batteries by Brand
const getForBattery = async (req, res) => {
  try {
    const { brandId } = req.params;
    console.log("Brand ID:", brandId);

    const batteries = await Battery.find({
      $or: [
        { BatteryBrand: brandId },
        { brand_id: brandId },
      ],
    });

    if (!batteries || batteries.length === 0) {
      return res.status(404).json({ message: 'No batteries found for this brand' });
    }

    return res.status(200).json({
      brandId: brandId,
      batteries: batteries,
    });
  } catch (error) {
    console.error('Error fetching batteries by brand:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};





export {
batteryAddFunction,
batteryGetFunction,
batteryUpdateFunction,
batteryDeleteFunction,
batteryBrandGetFunction,
countBatteryFunction,
activeBatteryBrand,
getForBattery
};