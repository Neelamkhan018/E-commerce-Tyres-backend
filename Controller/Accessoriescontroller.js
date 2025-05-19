import AccessoriesBrand from "../Models/Accessoriesbrand.js";
import multer from "multer";
import path from "path";
import { Accessories } from "../Models/adminModel.js";




import upload from "../utils/upload.js"





// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage }).array('image', 10);

// // Add Accessories Brand
// const accessoriesBrandAddFunction = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) return res.status(500).json({ message: "Error uploading image" });

//     const { name, slug, description } = req.body;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }

//     const imageNames = req.files.map(file => file.filename);

//     const newAccessoriesBrand = new AccessoriesBrand({
//       name,
//       slug,
//       description,
//       image: imageNames
//     });

//     try {
//       await newAccessoriesBrand.save();
//       res.status(201).json({ message: "Accessories brand added successfully" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error saving accessories brand" });
//     }
//   });
// };

// Add Accessories Brand
const accessoriesBrandAddFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description } = req.body;

    // Get uploaded images from 'image' field
    const imageFiles = req.files['image'] || [];

    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract image URLs from S3/DigitalOcean
    const imageUrls = imageFiles.map(file => file.location);

    // Create new accessories brand
    const newAccessoriesBrand = new AccessoriesBrand({
      name,
      slug,
      description,
      image: imageUrls,
    });

    try {
      await newAccessoriesBrand.save();
      res.status(201).json({ message: "Accessories brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving accessories brand" });
    }
  });
};


// Get all Accessories Brands
const accessoriesBrandGetFunction = async (req, res) => {
  try {
    const brands = await AccessoriesBrand.find();
    res.status(200).json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching accessories brands" });
  }
};

// Get one Accessories Brand
const accessoriesBrandGetById = async (req, res) => {
  try {
    const brand = await AccessoriesBrand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Accessories brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Error fetching accessories brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// // Update Accessories Brand
// const accessoriesBrandUpdateFunction = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) return res.status(500).json({ message: "Error uploading image" });

//     const { id } = req.params;
//     const { name, slug, description } = req.body;

//     try {
//       const existingBrand = await AccessoriesBrand.findById(id);
//       if (!existingBrand) return res.status(404).json({ error: 'Accessories brand not found' });

//       let imageNames = existingBrand.image;
//       if (req.files && req.files.length > 0) {
//         imageNames = req.files.map(file => file.filename);
//       }

//       const updatedBrand = await AccessoriesBrand.findByIdAndUpdate(
//         id,
//         { name, slug, description, image: imageNames },
//         { new: true }
//       );

//       res.status(200).json({ message: 'Accessories brand updated successfully', updatedBrand });
//     } catch (error) {
//       console.error('Error updating accessories brand:', error);
//       res.status(500).json({ error: 'Failed to update accessories brand' });
//     }
//   });
// };


// Update Accessories Brand
const accessoriesBrandUpdateFunction = async (req, res) => {
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
      const updatedAccessoriesBrand = await AccessoriesBrand.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedAccessoriesBrand) {
        return res.status(404).json({ error: 'Accessories brand not found' });
      }

      res.status(200).json({
        message: 'Accessories brand updated successfully',
        updatedAccessoriesBrand,
      });
    } catch (error) {
      console.error('Error updating accessories brand:', error);
      res.status(500).json({ error: 'Failed to update accessories brand' });
    }
  });
};






// Delete Accessories Brand
const accessoriesBrandDeleteFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await AccessoriesBrand.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Accessories brand not found' });

    res.status(200).json({ message: 'Accessories brand deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting accessories brand:', error);
    res.status(500).json({ error: 'Failed to delete accessories brand' });
  }
};

// Count Accessories Models per Brand
const countAccessoriesFunction = async (req, res) => {
  try {
    const brands = await AccessoriesBrand.aggregate([
      {
        $lookup: {
          from: 'accessoriesmodels',
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
    console.error('Error fetching accessories brands:', error);
    res.status(500).json({ message: 'Error fetching accessories brands', error });
  }
};

// Set Active/Inactive Accessories Brand
const activeAccessoriesBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updated = await AccessoriesBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Accessories brand not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
};

// Get Accessories Models by Brand
const getForAccessoriesBrand = async (req, res) => {
  try {
    const { brandId } = req.params; // Extract brandId from request parameters
    console.log("Brand ID:", brandId);

    // Query the database for accessories that match the brandId
    const accessories = await Accessories.find({
      $or: [
        { accessoryBrand: brandId }, // Match by accessoriesBrand
        { brand_id: brandId },         // Match by brand_id (if applicable)
      ],
    });

    // Check if any accessories were found
    if (!accessories || accessories.length === 0) {
      return res.status(404).json({ message: 'No accessories found for this brand' });
    }

    // Return the found accessories
    return res.status(200).json({
      brandId: brandId,
      accessories: accessories,
    });
  } catch (error) {
    console.error('Error fetching accessories by brand:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export {
  accessoriesBrandAddFunction,
  accessoriesBrandGetFunction,
  accessoriesBrandUpdateFunction,
  accessoriesBrandDeleteFunction,
  accessoriesBrandGetById,
  countAccessoriesFunction,
  activeAccessoriesBrand,
  getForAccessoriesBrand
};
