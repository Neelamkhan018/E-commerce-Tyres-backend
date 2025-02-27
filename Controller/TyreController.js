
import TyreBrand from "../Models/TyreModel.js";
import multer from "multer";
import path from "path"
import { BikeTyre, CarTyre } from "../Models/adminModel.js";
import mongoose from 'mongoose';


// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  }
});

// Initialize multer for image upload (allowing up to 10 images)
const upload = multer({ storage: storage }).array('image', 10);

const tyreFunction = async (req, res) => {

  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Get image filenames
    const imageNames = req.files.map(file => file.filename);

    // Create new tyre brand
    const newTyreBrand = new TyreBrand({
      name,
      slug,
      description,
      image: imageNames // Save uploaded images
    });

    try {
      // Save tyre brand to database
      await newTyreBrand.save();
      res.status(201).json({ message: "Tyre brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving tyre brand" });
    }
  });
  }



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




  const tyreUpdateFunction = async (req,res)=>{

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ message: "Error uploading image" });
      }
  
      const { id } = req.params;
      const { name, slug, description } = req.body;
  
      let imageNames = req.body.image || []; // Use existing images if no new ones are uploaded
  
      if (req.files && req.files.length > 0) {
        imageNames = req.files.map(file => file.filename); // Update with new images if any
      }
  
      try {
        const updatedBrand = await TyreBrand.findByIdAndUpdate(
          id,
          { name, slug, description, image: imageNames },
          { new: true }
        );
  
        if (!updatedBrand) {
          return res.status(404).json({ error: 'Tyre brand not found' });
        }
  
        res.status(200).json({ message: 'Tyre brand updated successfully', updatedBrand });
      } catch (error) {
        console.error('Error updating tyre brand:', error);
        res.status(500).json({ error: 'Failed to update tyre brand' });
      }
    });

  
    
  }
 
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

    // Log brand info for debugging
    console.log("Brand:", brand);

    const [carTyres, bikeTyres] = await Promise.all([
      CarTyre.find({ tyreBrand: brand._id }),  // Ensure using ObjectId for tyreBrand
      BikeTyre.find({ tyreBrand: brand._id })  // Ensure using ObjectId for tyreBrand
    ]);

    // Log tyre data for debugging
    console.log("Car Tyres:", carTyres);
    console.log("Bike Tyres:", bikeTyres);

    const allTyres = [...carTyres, ...bikeTyres];

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