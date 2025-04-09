import TruckBrand from "../Models/TruckBrand.js";
import multer from "multer";
import path from "path";
import { TruckTyre } from "../Models/adminModel.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
}); 

const upload = multer({ storage: storage }).array('image', 10);

const truckAddFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { name, slug, description } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageNames = req.files.map(file => file.filename);

    const newTruckBrand = new TruckBrand({
      name,
      slug,
      description,
      image: imageNames
    });

    try {
      await newTruckBrand.save();
      res.status(201).json({ message: "Truck brand added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving truck brand" });
    }
  });
};

const truckGetFunction = async (req, res) => {
  try {
    const truckBrands = await TruckBrand.find();
    res.status(200).json(truckBrands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching truck brands" });
  }
};

const truckUpdateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const { id } = req.params;
    const { name, slug, description } = req.body;

    try {
      const existingBrand = await TruckBrand.findById(id);
      if (!existingBrand) {
        return res.status(404).json({ error: 'Truck brand not found' });
      }

      let imageNames = existingBrand.image;
      if (req.files && req.files.length > 0) {
        imageNames = req.files.map(file => file.filename);
      }

      const updatedBrand = await TruckBrand.findByIdAndUpdate(
        id,
        { name, slug, description, image: imageNames },
        { new: true }
      );

      res.status(200).json({ message: 'Truck brand updated successfully', updatedBrand });
    } catch (error) {
      console.error('Error updating truck brand:', error);
      res.status(500).json({ error: 'Failed to update truck brand' });
    }
  });
};

const truckDeleteFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await TruckBrand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ error: 'Truck brand not found' });
    }
    res.status(200).json({ message: 'Truck brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error('Error deleting truck brand:', error);
    res.status(500).json({ error: 'Failed to delete truck brand' });
  }
};

const truckbrandGetFunction = async (req, res) => {
  try {
    const truckbrand = await TruckBrand.findById(req.params.id);
    if (!truckbrand) {
      return res.status(404).json({ message: 'Truck brand not found' });
    }
    res.json(truckbrand);
  } catch (error) {
    console.error('Error fetching truck brand:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const countTruckFunction = async (req, res) => {
  try {
    const truckBrands = await TruckBrand.aggregate([
      {
        $lookup: {
          from: 'truckmodels',
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
          modelCount: 1
        }
      }
    ]);

    console.log('Truck Brands with Model Counts:', truckBrands);
    res.json(truckBrands);
  } catch (error) {
    console.error('Error fetching truck brands:', error);
    res.status(500).json({ message: 'Error fetching truck brands', error });
  }
};

const activeTruckBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const brand = await TruckBrand.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ error: 'Truck brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }
};



const getForTruck = async (req, res) => {
  try {
    const { brandId } = req.params;
    console.log("Brand ID:", brandId);

    const truckTyres = await TruckTyre.find({
      $or: [
        { truckBrand: brandId },
        { tyreBrand: brandId },
      ],
    });

    if (!truckTyres || truckTyres.length === 0) {
      return res.status(404).json({ message: 'No truck tyres found for this brand' });
    }

    return res.status(200).json({
      brandId: brandId,
      tyres: truckTyres,
    });
  } catch (error) {
    console.error('Error fetching truck tyres by brand:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export {truckAddFunction,
    truckGetFunction,
    truckUpdateFunction,
    truckDeleteFunction,
    truckbrandGetFunction,
    countTruckFunction,
activeTruckBrand,
getForTruck}