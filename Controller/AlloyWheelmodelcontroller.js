import mongoose from "mongoose";
import AlloyWheelModel from "../Models/AlloyWheelModel.js";
import multer from "multer";
import path from "path";



import upload from "../utils/upload.js"


// const ObjectId = mongoose.Types.ObjectId;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   }
// });

// const upload = multer({ storage: storage }).array('image', 10);

// Post API for AlloyModel
// const alloyModelFunction = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(500).json({ message: "Error uploading image" });
//     }

//     console.log('Form data:', req.body);
//     console.log('Uploaded files:', req.files);

//     const { name, slug, description, brandid } = req.body;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }

//     const imageNames = req.files.map(file => file.filename);

//     // Create new alloy model
//     const newAlloyModel = new AlloyWheelModel({
//       name,
//       slug,
//       description,
//       image: imageNames,
//       brand_id: brandid
//     });

//     try {
//       await newAlloyModel.save();
//       res.status(201).json({ message: "Alloy model added successfully" });
//     } catch (err) {
//       console.error('Error saving alloy model:', err);
//       res.status(500).json({ message: "Error saving alloy model" });
//     }
//   });
// }



// Post API for Alloy Model
const alloyModelFunction = async (req, res) => {
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

    // Extract hosted image URLs (S3/DigitalOcean)
    const imageUrls = imageFiles.map(file => file.location);

    // Create new alloy wheel model
    const newAlloyModel = new AlloyWheelModel({
      name,
      slug,
      description,
      image: imageUrls,
      brand_id: brandid,
    });

    try {
      await newAlloyModel.save();
      res.status(201).json({ message: "Alloy model added successfully" });
    } catch (err) {
      console.error('Error saving alloy model:', err);
      res.status(500).json({ message: "Error saving alloy model" });
    }
  });
};





// Get API for AlloyModel
const alloyModelGetFunction = async (req, res) => {
  try {
    const brandIds = req.query.brandid;

    if (!brandIds) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid brand ID(s)" });
    }

    const alloyModels = await AlloyWheelModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true,
    });

    res.status(200).json(alloyModels);
  } catch (err) {
    console.error("Error fetching alloy models:", err);
    res.status(500).json({ message: "Error fetching alloy models" });
  }
};

// // Update API for AlloyModel
// const alloyModelUpdateFunction = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(500).json({ message: "Error uploading image" });
//     }

//     const { id } = req.params;
//     const { name, slug, description } = req.body;

//     let updatedFields = { name, slug, description };

//     if (req.files && req.files.length > 0) {
//       const imageNames = req.files.map(file => file.filename);
//       updatedFields.image = imageNames;
//     }

//     try {
//       const updatedAlloyModel = await AlloyWheelModel.findByIdAndUpdate(
//         id,
//         updatedFields,
//         { new: true }
//       );

//       if (!updatedAlloyModel) {
//         return res.status(404).json({ error: 'Alloy model not found' });
//       }

//       res.status(200).json({ message: 'Alloy model updated successfully', updatedAlloyModel });
//     } catch (error) {
//       console.error('Error updating alloy model:', error);
//       res.status(500).json({ error: 'Failed to update alloy model' });
//     }
//   });
// }



// Update API for Alloy Model
const alloyModelUpdateFunction = async (req, res) => {
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
      const updatedAlloyModel = await AlloyWheelModel.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedAlloyModel) {
        return res.status(404).json({ error: 'Alloy model not found' });
      }

      res.status(200).json({
        message: 'Alloy model updated successfully',
        updatedAlloyModel,
      });
    } catch (error) {
      console.error('Error updating alloy model:', error);
      res.status(500).json({ error: 'Failed to update alloy model' });
    }
  });
};








// Delete API for AlloyModel
const alloyModelDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAlloyModel = await AlloyWheelModel.findByIdAndDelete(id);

    if (!deletedAlloyModel) {
      return res.status(404).json({ error: 'Alloy model not found' });
    }

    res.status(200).json({ message: 'Alloy model deleted successfully', deletedAlloyModel });
  } catch (error) {
    console.error('Error deleting alloy model:', error);
    res.status(500).json({ error: 'Failed to delete Alloy model' });      
  }
}

// Get Single Alloy Model API
const alloyEditGetFunction = async (req, res) => {
  try {
    const alloyModel = await AlloyWheelModel.findById(req.params.id);
    if (!alloyModel) {
      return res.status(404).json({ message: 'Alloy model not found' });
    }
    res.json(alloyModel);
  } catch (error) {
    console.error('Error fetching alloy model:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

// Update Active Status API
const activeAlloyModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const model = await AlloyWheelModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!model) {
      return res.status(404).json({ error: 'Alloy model not found' });
    }

    res.json(model);
  } catch (error) {
    console.error('Failed to update active status:', error);
    res.status(500).json({ error: 'Failed to update active status' });
  }
}

export {
  alloyModelFunction,
  alloyModelGetFunction,
  alloyModelUpdateFunction,
  alloyModelDeleteFunction,
  alloyEditGetFunction,
  activeAlloyModel
};
