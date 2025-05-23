
import BikeBrand from "../Models/Bikebrand.js";

import { BikeTyre, CarTyre } from "../Models/adminModel.js";


import upload from "../utils/upload.js"




const bikebrandAddFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description } = req.body;

    // Check if files exist
    const imageFiles = req.files['image'] || [];
    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract image URLs from uploaded files (S3/DigitalOcean style)
    const imageUrls = imageFiles.map(file => file.location);

    const newBikeBrand = new BikeBrand({
      name,
      slug,
      description,
      image: imageUrls,
    });

    try {
      await newBikeBrand.save();
      res.status(201).json({ message: "Bike brand added successfully", newBikeBrand });
    } catch (err) {
      console.error("Error saving bike brand:", err);
      res.status(500).json({ message: "Error saving Bike brand" });
    }
  });
};



// Get api
const bikebrandGetFunction = async (req,res)=>{
    try {
     
        const bikeBrands = await BikeBrand.find({}); 
        res.status(200).json(bikeBrands); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching Bike brands" });
      }

}





// // Update Api



const bikebrandUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    let imageUrls = [];

    // Handle old image data from form (string or array)
    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        imageUrls = [req.body.image];
      } else if (Array.isArray(req.body.image)) {
        imageUrls = req.body.image;
      }
    }

    // Override with new image URLs if uploaded
    const imageFiles = req.files['image'] || [];
    if (imageFiles.length > 0) {
      imageUrls = imageFiles.map(file => file.location);
    }

    try {
      // Update the bike brand
      const updatedBikeBrand = await BikeBrand.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          description,
          image: imageUrls,
        },
        { new: true }
      );

      if (!updatedBikeBrand) {
        return res.status(404).json({ message: "Bike brand not found" });
      }

      res.status(200).json({
        message: "Bike brand updated successfully",
        updatedBikeBrand,
      });
    } catch (error) {
      console.error("Error updating bike brand:", error);
      res.status(500).json({ message: "Failed to update bike brand" });
    }
  });
};





// Delete Api 
const bikebrandDeleteFunction = async (req,res)=>{
    const { id } = req.params;

    try {
      const deletedBrand = await BikeBrand.findByIdAndDelete(id);
  
      if (!deletedBrand) {
        return res.status(404).json({ error: 'Bike brand not found' });
      }
  
      res.status(200).json({ message:'bike brand deleted successfully', deletedBrand });
    } catch (error) {
      console.error('Error deleting tyre brand:', error);
      res.status(500).json({ error: 'Failed to delete tyre brand' });
    }

}

const bikeeditGetFunction = async (req,res)=>{

  try {
    const bikeBrand = await BikeBrand.findById(req.params.id);
    if (!bikeBrand) {
      return res.status(404).json({ message: 'Car brand not found' });
    }
    res.json(bikeBrand);
  } catch (error) {
    console.error('Error fetching car brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }

}

const bikeCount = async (req,res)=>{
  
  try {
    const bikeBrands = await BikeBrand.aggregate([
      {
        $lookup: {
          from: 'bikemodels', // Collection name in the database
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
          isActive: 1,
          modelCount: 1 // Include model count in the result
        }
      }
    ]);

    console.log('Car Brands with Model Counts:', bikeBrands);

    res.json(bikeBrands);
  } catch (error) {
    
    console.error('Error fetching car brands:', error);
    res.status(500).json({ message: 'Error fetching car brands', error });
  }
}

const ActiveBikeBrand = async (req,res)=>{

  try {
    const { id } = req.params;
    const { active } = req.body;

    const brand = await BikeBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ error: 'car brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
}





const getForBike = async (req, res) => {
  try {
    // Extract the brand ID or slug from the request parameters (or query)
    const { brandId } = req.params; 
    console.log(brandId) // Could be brandId or slug depending on your preference

    // Find the car brand by ID (or slug) and populate the associated models
    const brand = await BikeTyre.find({ bikeBrand: {$in:[brandId]}});

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    // Send the response back with the models of the selected brand
    return res.status(200).json({
      brand: brand,
      
    });

  } catch (error) {
    console.error('Error fetching brand and models:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};




export{
    bikebrandAddFunction,
    bikebrandGetFunction,
    bikebrandUpdateFunction,
    bikebrandDeleteFunction,
    bikeeditGetFunction,
    bikeCount,
    ActiveBikeBrand,
    getForBike,
   
}

