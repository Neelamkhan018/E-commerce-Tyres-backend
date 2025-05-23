
import TyreBrand from "../Models/TyreModel.js";
import multer from "multer";
import path from "path"
import { Accessories, AlloyWheel, Battery, BikeTyre, CarTyre, TractorTyre, TruckTyre } from "../Models/adminModel.js";
import mongoose from 'mongoose';




import upload from "../utils/upload.js"






const tyreFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    try {
      // Check for duplicate slug
      const existingBrand = await TyreBrand.findOne({ slug });
      if (existingBrand) {
        return res.status(400).json({ message: `Slug "${slug}" already exists.` });
      }

      const imageFiles = req.files['image'] || [];
      const imageUrls = imageFiles.map(file => file.location);

      const newTyreBrand = new TyreBrand({
        name,
        slug,
        description,
        category,
        image: imageUrls,
      });

      await newTyreBrand.save();
      res.status(201).json({ message: "Tyre brand added successfully" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving tyre brand" });
    }
  });
};



  const tyreGetFunction = async (req,res)=>{
    try {
      const tyreBrands = await TyreBrand.find(); // Fetch all tyre brands from the database
      res.status(200).json(tyreBrands); // Send response with the tyre brand data
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching tyre brands" });
    }
  }



 
  

  

 


  
  const tyreDeleteFunction = async (req,res)=>{
    const { id } = req.params;

  try {
    const deletedBrand = await TyreBrand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Tyre brand not found' });
    }

    res.status(200).json({ message: 'Tyre brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error('Error deleting tyre brand:', error);
    res.status(500).json({ error: 'Failed to delete tyre brand' });
  }
  }




const tyreUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description, category } = req.body; // Include category

    let imageUrls = [];

    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        imageUrls = [req.body.image];
      } else if (Array.isArray(req.body.image)) {
        imageUrls = req.body.image;
      }
    }

    const imageFiles = req.files['image'] || [];
    if (imageFiles.length > 0) {
      imageUrls = imageFiles.map(file => file.location);
    }

    try {
      const updatedBrand = await TyreBrand.findByIdAndUpdate(
        id,
        { name, slug, description, category, image: imageUrls }, // Include category in update
        { new: true }
      );

      if (!updatedBrand) {
        return res.status(404).json({ error: 'Tyre brand not found' });
      }

      res.status(200).json({
        message: 'Tyre brand updated successfully',
        updatedBrand,
      });
    } catch (error) {
      console.error('Error updating tyre brand:', error);
      res.status(500).json({ error: 'Failed to update tyre brand' });
    }
  });
};




 
  const tyreeditGetFunction = async(req,res)=>{
    try {
      const tyreBrand = await TyreBrand.findById(req.params.id);
      if (!tyreBrand) {
        return res.status(404).json({ message: 'tyre brand not found' });
      }
      res.json(tyreBrand);
    } catch (error) {
      console.error('Error fetching car brand:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }


 const tyreactive = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updatedBrand = await TyreBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


const GettyreFunction = async (req,res)=>{
  const { id } = req.params;
  try {
    const tyreBrand = await TyreBrand.findById(id); // Find tyreBrand by ID
    if (!tyreBrand) {
      return res.status(404).json({ message: 'Tyre brand not found' });
    }

    res.json({ image: tyreBrand.image }); // Return the image URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}




const getForTyre = async (req, res) => {
  try {
    const { brandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ message: "Invalid brand ID format" });
    }

    const brand = await TyreBrand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ message: "Tyre brand not found" });
    }

    const [carTyres, bikeTyres, truckTyres, tractorTyres, batteries, alloyWheels, accessories] = await Promise.all([
      CarTyre.find({ tyreBrand: brand._id }),  // Ensure using ObjectId for tyreBrand
      BikeTyre.find({ tyreBrand: brand._id }),  // Ensure using ObjectId for tyreBrand
      TruckTyre.find({ tyreBrand: brand._id }), // New query for truck tyres
      TractorTyre.find({ tyreBrand: brand._id }), // New query for tractor tyres
      Battery.find({ tyreBrand: brand._id }), // Assuming Battery is related to the brand
      AlloyWheel.find({ tyreBrand: brand._id }), // Assuming AlloyWheel is related to the brand
      Accessories.find({ tyreBrand: brand._id }) // New query for accessories
    ]);

    const allTyres = [
      ...carTyres,
      ...bikeTyres,
      ...truckTyres,
      ...tractorTyres,
      ...batteries,  // Include batteries if needed
      ...alloyWheels, // Include alloy wheels if needed
      ...accessories // Include accessories if needed
    ];

    // If no tyres found, send an empty array but without the popup message
    return res.status(200).json({
      count: allTyres.length,
      tyres: allTyres,  // Empty array will be returned if no tyres found
    });

  } catch (error) {
    console.error("Error fetching tyres by brand:", error);
    return res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};

  export  {
    tyreFunction,
    tyreGetFunction,
    tyreDeleteFunction,
    tyreUpdateFunction,
    tyreeditGetFunction,
    tyreactive,
    GettyreFunction,
    getForTyre
  }