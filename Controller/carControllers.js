
import CarBrand from "../Models/CarBrand.js";

import {  CarTyre } from "../Models/adminModel.js";


import upload from "../utils/upload.js"





const carAddFunction = async (req, res) => {
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

    // Extract DigitalOcean URLs
    const imageUrls = imageFiles.map(file => file.location);

    // Create new car brand
    const newCarBrand = new CarBrand({
      name,
      slug,
      description,
      image: imageUrls,
    });

    try {
      await newCarBrand.save();
      res.status(201).json({ message: "Car brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving car brand" });
    }
  });
};




// get api

const carGetFunction = async(req,res)=>{
    try {
        const carBrands = await CarBrand.find(); 
        res.status(200).json(carBrands); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching tyre brands" });
      }
}


// update api

const carUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    let imageUrls = [];

    // Handle existing images from form (string or array)
    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        imageUrls = [req.body.image];
      } else if (Array.isArray(req.body.image)) {
        imageUrls = req.body.image;
      }
    }

    // If new images are uploaded, override with them
    const imageFiles = req.files['image'] || [];
    if (imageFiles.length > 0) {
      imageUrls = imageFiles.map(file => file.location);
    }

    try {
      const updatedBrand = await CarBrand.findByIdAndUpdate(
        id,
        { name, slug, description, image: imageUrls },
        { new: true }
      );

      if (!updatedBrand) {
        return res.status(404).json({ error: 'Car brand not found' });
      }

      res.status(200).json({
        message: 'Car brand updated successfully',
        updatedBrand,
      });
    } catch (error) {
      console.error('Error updating car brand:', error);
      res.status(500).json({ error: 'Failed to update car brand' });
    }
  });
};






const carDeleteFunction = async (req,res)=>{
    const { id } = req.params;

  try {
    const deletedBrand = await CarBrand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Tyre brand not found' });
    }

    res.status(200).json({ message: 'Tyre brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error('Error deleting tyre brand:', error);
    res.status(500).json({ error: 'Failed to delete tyre brand' });
  }


}



const carbrandGetFunction = async (req,res)=>{
 
  try {
    const carbrand = await CarBrand.findById(req.params.id);
    if (!carbrand) {
      return res.status(404).json({ message: 'Car brand not found' });
    }
    res.json(carbrand);
  } catch (error) {
    console.error('Error fetching car brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}



const countFunction = async (req,res)=>{

  try {
    const carBrands = await CarBrand.aggregate([
      {
        $lookup: {
          from: 'carmodels', // Collection name in the database
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

    console.log('Car Brands with Model Counts:', carBrands);

    res.json(carBrands);
  } catch (error) {
    // Log the error message
    console.error('Error fetching car brands:', error);
    res.status(500).json({ message: 'Error fetching car brands', error });
  }
 
}


const activeCarBrand = async (req,res)=>{

  try {
    const { id } = req.params;
    const { active } = req.body;

    const brand = await CarBrand.findByIdAndUpdate(
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


const getForcar = async (req, res) => {
  try {
    // Extract the brand ID or slug from the request parameters (or query)
    const { brandId } = req.params; 
    console.log(brandId) // Could be brandId or slug depending on your preference

    // Find the car brand by ID (or slug) and populate the associated models
    const brand = await CarTyre.find({ carbrand: {$in:[brandId]}});

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





export {
    carAddFunction,
    carGetFunction,
    carUpdateFunction,
    carDeleteFunction,
    carbrandGetFunction,
    countFunction,
    activeCarBrand,
    getForcar,


    
   
}