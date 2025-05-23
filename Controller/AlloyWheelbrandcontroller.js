import AlloyWheelBrand from "../Models/AlloyWheelbrand.js";

import { AlloyWheel } from "../Models/adminModel.js";



import upload from "../utils/upload.js"




// Add Alloy Wheel Brand
const alloyWheelAddFunction = async (req, res) => {
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

    // Extract S3/DigitalOcean URLs
    const imageUrls = imageFiles.map(file => file.location);

    // Create new alloy wheel brand
    const newAlloyWheelBrand = new AlloyWheelBrand({
      name,
      slug,
      description,
      image: imageUrls,
    });

    try {
      await newAlloyWheelBrand.save();
      res.status(201).json({ message: "Alloy wheel brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving alloy wheel brand" });
    }
  });
};





// Get all Alloy Wheel Brands
const alloyWheelGetFunction = async (req, res) => {
  try {
    const brands = await AlloyWheelBrand.find();
    res.status(200).json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching alloy wheel brands" });
  }
};

// Get one Alloy Wheel Brand
const alloyWheelBrandGetFunction = async (req, res) => {
  try {
    const brand = await AlloyWheelBrand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Alloy wheel brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Error fetching alloy wheel brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};





// Update Alloy Wheel Brand
const alloyWheelUpdateFunction = async (req, res) => {
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
      const updatedAlloyWheelBrand = await AlloyWheelBrand.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedAlloyWheelBrand) {
        return res.status(404).json({ error: 'Alloy wheel brand not found' });
      }

      res.status(200).json({
        message: 'Alloy wheel brand updated successfully',
        updatedAlloyWheelBrand,
      });
    } catch (error) {
      console.error('Error updating alloy wheel brand:', error);
      res.status(500).json({ error: 'Failed to update alloy wheel brand' });
    }
  });
};








// Delete Alloy Wheel Brand
const alloyWheelDeleteFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await AlloyWheelBrand.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Alloy wheel brand not found' });

    res.status(200).json({ message: 'Alloy wheel brand deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting alloy wheel brand:', error);
    res.status(500).json({ error: 'Failed to delete alloy wheel brand' });
  }
};

// Count Alloy Wheel Models per Brand
const countAlloyWheelFunction = async (req, res) => {
  try {
    const brands = await AlloyWheelBrand.aggregate([
      {
        $lookup: {
          from: 'alloywheelmodels',
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
    console.error('Error fetching alloy wheel brands:', error);
    res.status(500).json({ message: 'Error fetching alloy wheel brands', error });
  }
};

// Set Active/Inactive Alloy Wheel Brand
const activeAlloyWheelBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updated = await AlloyWheelBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Alloy wheel brand not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
};



const getForAlloyWheel = async (req, res) => {
  try {
    const { brandId } = req.params; // Extract brandId from request parameters
    console.log("Brand ID:", brandId);

    // Query the database for alloy wheels that match the brandId
    const alloyWheels = await AlloyWheel.find({
      $or: [
        { alloywheelBrand: brandId }, // Match by AlloyWheelBrand
        { brand_id: brandId },        // Match by brand_id (if applicable)
      ],
    });

    // Check if any alloy wheels were found
    if (!alloyWheels || alloyWheels.length === 0) {
      return res.status(404).json({ message: 'No alloy wheels found for this brand' });
    }

    // Return the found alloy wheels
    return res.status(200).json({
      brandId: brandId,
      alloyWheels: alloyWheels,
    });
  } catch (error) {
    console.error('Error fetching alloy wheels by brand:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export {
  alloyWheelAddFunction,
  alloyWheelGetFunction,
  alloyWheelUpdateFunction,
  alloyWheelDeleteFunction,
  alloyWheelBrandGetFunction,
  countAlloyWheelFunction,
  activeAlloyWheelBrand,
  getForAlloyWheel
};
