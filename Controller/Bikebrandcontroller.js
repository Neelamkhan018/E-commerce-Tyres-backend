
import BikeBrand from "../Models/Bikebrand.js";
import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage }).array('image', 10);

// post api
const bikebrandAddFunction = async(req,res)=>{
    upload(req, res, async function (err) {
        if (err) {
          return res.status(500).json({ message: "Error uploading image" });
        }
    
        const { name, slug, description } = req.body;
    
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No images uploaded" });
        }
    
        
        const imageNames = req.files.map(file => file.filename);
    
        const newbikeBrand = new BikeBrand({
          name,
          slug,
          description,
          image: imageNames 
        });
    
        try {
         
          await newbikeBrand.save();
          res.status(201).json({ message: "Bike brand added successfully" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Error saving Bike brand" });
        }
      });
}


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

// Update Api
const bikebrandUpdateFunction = async(req,res)=>{
  
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    try {
      // Fetch the existing bike brand data
      const bikeBrand = await BikeBrand.findById(id);

      if (!bikeBrand) {
        return res.status(404).json({ message: 'Bike brand not found' });
      }

      // Update the fields if they are provided
      bikeBrand.name = name || bikeBrand.name;
      bikeBrand.slug = slug || bikeBrand.slug;
      bikeBrand.description = description || bikeBrand.description;

      // If new images are uploaded, update the images field
      if (req.files && req.files.length > 0) {
        bikeBrand.image = req.files.map(file => file.filename);
      }

      // Save the updated bike brand
      const updatedBikeBrand = await bikeBrand.save();

      res.status(200).json(updatedBikeBrand);
    } catch (error) {
      console.error('Error updating bike brand:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}

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

export{
    bikebrandAddFunction,
    bikebrandGetFunction,
    bikebrandUpdateFunction,
    bikebrandDeleteFunction,
    bikeeditGetFunction,
    bikeCount,
    ActiveBikeBrand
}

