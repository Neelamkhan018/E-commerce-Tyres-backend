
import mongoose from "mongoose";
import BikeModel from "../Models/BikeModel.js";



import upload from "../utils/upload.js"


const bikeModelFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }


    const { name, slug, description, brandid } = req.body;

    const imageFiles = req.files['image'] || [];

    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageUrls = imageFiles.map(file => file.location);

    const newBikeModel = new BikeModel({
      name,
      slug,
      description,
      image: imageUrls,
      brand_id: brandid
    });

    try {
      await newBikeModel.save();
      res.status(201).json({ message: "Bike model added successfully" });
    } catch (err) {
      console.error('Error saving bike model:', err);
      res.status(500).json({ message: "Error saving bike model" });
    }
  });
};


// Get API
const bikeModelGetFunction = async (req, res) => {
  

  try {
    const brandIds = req.query.brandid;
    const brandIdArray = Array.isArray(brandIds) ? brandIds : [brandIds];

    if (brandIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid brand ID(s)' });
    }

    const bikeModels = await BikeModel.find({
      brand_id: { $in: brandIdArray.map(id => new mongoose.Types.ObjectId(id)) },
      active: true,
    });

    res.status(200).json(bikeModels);
  } catch (err) {
    console.error('Error fetching bike models:', err);
    res.status(500).json({ message: 'Error fetching bike models' });
  }


}



// // Update API
const bikeModelUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    let imageUrls = [];

    // Handle existing image URLs from the form (e.g., from hidden fields or frontend state)
    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        imageUrls = [req.body.image];
      } else if (Array.isArray(req.body.image)) {
        imageUrls = req.body.image;
      }
    }

    // If new images are uploaded, override the imageUrls
    const imageFiles = req.files['image'] || [];
    if (imageFiles.length > 0) {
      imageUrls = imageFiles.map(file => file.location);
    }

    try {
      const updatedBikeModel = await BikeModel.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedBikeModel) {
        return res.status(404).json({ error: 'Bike model not found' });
      }

      res.status(200).json({
        message: 'Bike model updated successfully',
        updatedBikeModel,
      });
    } catch (error) {
      console.error('Error updating bike model:', error);
      res.status(500).json({ error: 'Failed to update bike model' });
    }
  });
};


// Delete API
const bikeModelDeleteFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBikeModel = await BikeModel.findByIdAndDelete(id);

    if (!deletedBikeModel) {
      return res.status(404).json({ error: 'Bike model not found' });
    }

    res.status(200).json({ message: 'Bike model deleted successfully', deletedBikeModel });
  } catch (error) {
    console.error('Error deleting bike model:', error);
    res.status(500).json({ error: 'Failed to delete bike model' });
  }
}

const bikeEditGetFunction = async (req,res)=>{

  try {
    const bikeBrand = await BikeModel.findById(req.params.id);
    if (!bikeBrand) {
      return res.status(404).json({ message: 'Car brand not found' });
    }
    res.json(bikeBrand);
  } catch (error) {
    console.error('Error fetching car brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}


const ActiveBikeModel = async (req,res)=>{


  try {
    const { id } = req.params;
    const { active } = req.body;

    const model= await BikeModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!model) {
      return res.status(404).json({ error: 'car brand not found' });
    }

    res.json(model);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
}

export {
  bikeModelFunction,
  bikeModelGetFunction,
  bikeModelUpdateFunction,
  bikeModelDeleteFunction,
  bikeEditGetFunction,
  ActiveBikeModel

}
