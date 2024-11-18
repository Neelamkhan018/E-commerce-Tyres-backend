
import  {BikeTyre, CarTyre } from "../Models/adminModel.js";
import userModel from "../Models/UserModel.js";
import multer from 'multer'
import Jwt from "jsonwebtoken"
import mongoose from "mongoose";


import path from 'path'
import CarBrand from "../Models/CarBrand.js";
import CarModel from "../Models/CarModel.js";

import BikeBrand from "../Models/Bikebrand.js";
import BikeModel from "../Models/BikeModel.js";
import TyreBrand from "../Models/TyreModel.js";

const ObjectId = mongoose.Types.ObjectId;


const storage = multer.diskStorage({
  destination: './uploads/', // Folder where files will be stored
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create multer instance to handle file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
}).fields([
  { name: 'avatar', maxCount: 1 }, 
  { name: 'thumb1', maxCount: 1 },  
  { name: 'thumb2', maxCount: 1 },  
  { name: 'thumb3', maxCount: 1 },  
  { name: 'thumb4', maxCount: 1 },  
  { name: 'thumb5', maxCount: 1 },  
  { name: 'thumb6', maxCount: 1 }   
]);





// const Jwtkey = 'e-comm';

// --------------------- Register ------------------------------

const addRegisterFunction = async(req,res)=>{
    // let user = new userModel(req.body);
    // let result = await user.save();
    // result = result.toObject();
    // delete result.password;
    // Jwt.sign({ result },Jwtkey,{expiresIn:"12h"},(err,token)=>{
    //     if(err){
    //         res.send({result:'something went wrong,please try after sometime'})
    //     }
    //     res.send({result,auth:token})
    // })

}

//  ------------------------- Login -----------------------------------

const addLoginFunction = async (req, res) => {
  // Check if email and password are provided
  if (req.body.password && req.body.email) {
      // Find the user by email and password
      let user = await userModel.findOne({ email: req.body.email, password: req.body.password }).select("-password");

      // If user is found
      if (user) {
          // Send the user information without the auth token
          res.send({ user });
      } else {
          // If no user found
          res.send({ result: "No user found" });
      }
  } else {
      // If email or password is not provided
      res.send({ result: 'Email and password are required' });
  }
}
// ------------------ Add Product ------------------------------

const addProductFunction = async (req, res) => {

  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(500).send({ message: "Multer error: " + err.message });
      } else if (err) {
        console.error("Unknown error:", err);
        return res.status(500).send({ message: "Unknown error: " + err.message });
      }

      if (!req.body || !req.files) {
        return res.status(400).send({ message: "No data or files uploaded" });
      }

      const {
        title, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
        bikeBrand, bikeModel, tyreBrand,  width, height, customs,
        seasons, speedRating, loadCapacity, price, Salesprice, description,
        description1, warranty, city, state, manufactureMonth, manufactureYear,
        fronttyre, reartyre, material
      } = req.body;

      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);

      // Parse the addresses if needed
      let addresses = [];
      try {
        addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
        console.log("Parsed Addresses:", addresses);
      } catch (e) {
        console.error("Error parsing addresses:", e);
        return res.status(400).send({ message: "Invalid addresses format" });
      }

      // Collect the uploaded images' filenames
      const avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : null;
      const thumb1Images = req.files['thumb1'] ? req.files['thumb1'][0].filename : null;
      const thumb2Images = req.files['thumb2'] ? req.files['thumb2'][0].filename : null;
      const thumb3Images = req.files['thumb3'] ? req.files['thumb3'][0].filename : null;
      const thumb4Images = req.files['thumb4'] ? req.files['thumb4'][0].filename : null;
      const thumb5Images = req.files['thumb5'] ? req.files['thumb5'][0].filename : null;
      const thumb6Images = req.files['thumb6'] ? req.files['thumb6'][0].filename : null;

      try {
        // If tyreType is 'car', save a car tyre
        if (tyreType === 'car') {
          const carTyre = new CarTyre({
            title,
            tyreType,
            carbrand,
            carModel,
            tyreBrand,
            width,
            addresses,
            height,
            customs,
            seasons,
            speedRating,
            loadCapacity,
            material,
            manufactureMonth,
            manufactureYear,
            avatarImages,  // Store avatar image
            thumb1Images,  // Store thumbnail images
            thumb2Images,
            thumb3Images,
            thumb4Images,
            thumb5Images,
            thumb6Images,
            price,
            Salesprice,
            description,
            description1,
            warranty,
            city,
            state,
            pinCode,
            details
          });
         
          await carTyre.save();
          res.send({ message: "Car tyre added successfully" });

        // If tyreType is 'bike', save a bike tyre
        } else if (tyreType === 'bike') {
          const bikeTyre = new BikeTyre({
            title,
            tyreType,
            bikeBrand,
            bikeModel,
            tyreBrand, 
            width,
            addresses,
            height,
            customs,
            seasons,
            fronttyre,
            reartyre,
            speedRating,
            loadCapacity,
            material,
            avatarImages,  // Store avatar image
            thumb1Images,  // Store thumbnail images
            thumb2Images,
            thumb3Images,
            thumb4Images,
            thumb5Images,
            thumb6Images,
            manufactureMonth,
            manufactureYear,
            price,
            Salesprice,
            description,
            description1,
            warranty,
            city,
            state,
            pinCode,
            details
          });

          await bikeTyre.save();
          res.send({ message: "Bike tyre added successfully" });

        } else {
          res.status(400).send({ message: "Invalid tyre type" });
        }
      } catch (err) {
        console.error("Error saving tyre data:", err);
        res.status(500).send({ message: "Error saving tyre data" });
      }
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).send({ message: "Error processing request" });
  }
 
  };



// ------------------ Get Products ------------------------

const showProductFunction = async(req,res)=>{
  
  try {
    // Fetch all car tyres and bike tyres asynchronously
    const [carTyres, bikeTyres] = await Promise.all([
      CarTyre.find().exec(),
      BikeTyre.find().exec(),
    ]);
  
    // Helper function to validate if an ID is a valid ObjectId
    const isValidObjectId = (id) => {
      return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
    };
  
    // Helper function to map valid brand or model IDs to names
    const getNamesByIds = async (ids, model) => {
      const names = await Promise.all(
        ids
          .filter(isValidObjectId)  // Filter out invalid ObjectIds
          .map(async (id) => {
            const item = await model.findOne({ _id: new ObjectId(id) });
            return item ? item.name : null;
          })
      );
      return names.filter((name) => name); // Remove null values if any
    };
  
    // Update car tyres with corresponding brand, model, and tyre brand names
    const updatedCarTyres = await Promise.all(
      (carTyres || []).map(async (tyre) => {
        const carBrandIds = tyre.carbrand[0].split(",");
        const carModelIds = tyre.carModel[0].split(",");
        const tyreBrandIds = tyre.tyreBrand[0].split(","); // Assuming tyreBrand is an array or string
  
        const carBrandNames = await getNamesByIds(carBrandIds, CarBrand);
        const carModelNames = await getNamesByIds(carModelIds, CarModel);
        const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand); // Fetch tyreBrand names
  
        return {
          ...tyre.toObject(),
          carbrand: carBrandNames,
          carModel: carModelNames,
          tyreBrand: tyreBrandNames, // Add tyreBrand names to the result
        };
      })
    );
  
    // Update bike tyres with corresponding brand, model, and tyre brand names
    const updatedBikeTyres = await Promise.all(
      (bikeTyres || []).map(async (tyre) => {
        const bikeBrandIds = tyre.bikeBrand[0].split(",");
        const bikeModelIds = tyre.bikeModel[0].split(",");
        const tyreBrandIds = tyre.tyreBrand[0].split(","); // Assuming tyreBrand is an array or string
  
        const bikeBrandNames = await getNamesByIds(bikeBrandIds, BikeBrand);
        const bikeModelNames = await getNamesByIds(bikeModelIds, BikeModel);
        const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand); // Fetch tyreBrand names
  
        return {
          ...tyre.toObject(),
          bikeBrand: bikeBrandNames,
          bikeModel: bikeModelNames,
          tyreBrand: tyreBrandNames, // Add tyreBrand names to the result
        };
      })
    );
  
    // Combine updated car and bike tyres
    const tyres = [...updatedCarTyres, ...updatedBikeTyres];
  
    // Send response with the combined tyre data
    res.send(tyres);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting tyres" });
  }
}


 
// --------------------- update show form ------------------------------

const showFunction = async (req,res)=>{

  try {
    const { id, tyreType } = req.params;

    let tyreData;
    if (tyreType === 'car') {
      tyreData = await CarTyre.findById(id);
    } else if (tyreType === 'bike') {
      tyreData = await BikeTyre.findById(id);
    }

    if (!tyreData) {
      return res.status(404).json({ message: 'Tyre not found' });
    }

    // Send the tyre data as response
    res.json(tyreData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  


}






// //   // --------------UPDATE FUNCTION ----------------------


const updateFunction = async (req, res) => {
  // Ensure multer handles file upload before processing request
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).send({ message: "Multer error: " + err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).send({ message: "Unknown error: " + err.message });
    }

    // Check if body and files are available
    if (!req.body || !req.files) {
      return res.status(400).send({ message: "No data or files uploaded" });
    }
    console.log(req.body);
    console.log(req.files);
    
    

    const { id } = req.params;
    const {
      title, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
      bikeBrand, bikeModel, tyreBrand, tyreModel, width, height, customs,
      seasons, speedRating, loadCapacity, price, Salesprice, description,
      description1, warranty, city, state, manufactureMonth, manufactureYear,
      fronttyre, reartyre,  quantity, material,avatarImages,thumb1Images,thumb2Images,thumb3Images,thumb4Images,thumb5Images,thumb6Images
    } = req.body;

    let TyreModel;

    // Determine tyre model (car or bike)
    switch (tyreType) {
      case 'car':
        TyreModel = CarTyre;
        break;
      case 'bike':
        TyreModel = BikeTyre;
        break;
      default:
        return res.status(400).send({ message: 'Invalid tyre type' });
    }

    // Parse addresses if needed
    let addresses = [];
    try {
      addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
      console.log("Parsed Addresses:", addresses);
    } catch (e) {
      console.error("Error parsing addresses:", e);
      return res.status(400).send({ message: "Invalid addresses format" });
    }

    try {
      // Find the existing tyre
      const existingTyre = await TyreModel.findById(id);
      if (!existingTyre) {
        return res.status(404).send({ message: `Tyre with ID ${id} not found `});
      }

      // Initialize image variables with existing values
      let avatarImages = existingTyre.avatarImages || '';
      let thumb1Images = existingTyre.thumb1Images || '';
      let thumb2Images = existingTyre.thumb2Images || '';
      let thumb3Images = existingTyre.thumb3Images || '';
      let thumb4Images = existingTyre.thumb4Images || '';
      let thumb5Images = existingTyre.thumb5Images || '';
      let thumb6Images = existingTyre.thumb6Images || '';

      // Handle image uploads
      if (req.files) {
        avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : avatarImages;
        thumb1Images = req.files['thumb1'] ? req.files['thumb1'][0].filename : thumb1Images;
        thumb2Images = req.files['thumb2'] ? req.files['thumb2'][0].filename : thumb2Images;
        thumb3Images = req.files['thumb3'] ? req.files['thumb3'][0].filename : thumb3Images;
        thumb4Images = req.files['thumb4'] ? req.files['thumb4'][0].filename : thumb4Images;
        thumb5Images = req.files['thumb5'] ? req.files['thumb5'][0].filename : thumb5Images;
        thumb6Images = req.files['thumb6'] ? req.files['thumb6'][0].filename : thumb6Images;
      }
      // Update the tyre
      const updatedTyre = await TyreModel.findByIdAndUpdate(
        id,
        {
          title,
          carbrand,
          carModel,
          tyreType,
          bikeBrand,
          bikeModel,
          tyreBrand,
          tyreModel,
          width,
          addresses,
          height,
          customs,
          seasons,
          fronttyre,
          reartyre,
          speedRating,
          loadCapacity,
          material,
          avatarImages,
          thumb1Images,
          thumb2Images,
          thumb3Images,
          thumb4Images,
          thumb5Images,
          thumb6Images,
          manufactureMonth,
          manufactureYear,
          price,
          Salesprice,
          description,
          description1,
          warranty,
          quantity,
          city,
          state,
          pinCode,
          details,
        },
        { new: true } // Return the updated document
      );

      if (updatedTyre) {
        res.send({ message: `${tyreType.charAt(0).toUpperCase()}${tyreType.slice(1)} tyre with ID ${id} updated successfully, updatedTyre `});
      } else {
        res.status(404).send({ message: `Tyre with ID ${id} not found `});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: `Error updating ${tyreType} tyre `});
    }
  });
};



// ------------------- delete function ------------------------

const deleteFunction = async (req,res)=>{
  const id = req.params.id;
  const type = req.params.type;

  let TyreModel;

  switch (type) {
    
    
    case 'car':
      TyreModel = CarTyre;
      break;
    case 'bike':
      TyreModel = BikeTyre;
      break;
    default:
      return res.status(400).send({ message: 'Invalid tyre type' });
  }

  try {
    const deletedTyre = await TyreModel.deleteOne({ _id: id });
    if (deletedTyre.deletedCount === 1) {
      res.send({ message: `${type.charAt(0).toUpperCase()}${type.slice(1)} tyre with ID ${id} deleted` });
    } else {
      res.status(404).send({ message: `Tyre with ID ${id} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error deleting ${type} tyre` });
  }
}




const SearchFunction = async (req, res) => {

  const tyreType = req.params.type;
  const width = req.params.width || '';
  const height = req.params.height || '';
  const customs = req.params.customs || '';
  const seasons = req.params.seasons || '';

  let TyreModel;
  if (tyreType === 'car') {
    TyreModel = CarTyre;
  } else if (tyreType === 'bike') {
    TyreModel = BikeTyre;
  } else {
    return res.status(400).json({ message: 'Invalid tyre type' });
  }

  try {
    const query = {};

    if (width !== 'all') {
      query.width = width;
    }

    if (height !== 'all') {
      query.height = height;
    }

    if (customs !== 'all') {
      query.customs = customs;
    }

    if (seasons !== 'all') {
      query.seasons = seasons;
    }

    const tyres = await TyreModel.find(query);
    res.json(tyres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching tyres' });
  }
};




const TyreActive = async (req,res)=>{

  const { id } = req.params;
  const { active } = req.body;

  let tyre = await CarTyre.findById(id); // Try finding the tyre in CarTyre collection

  if (!tyre) {
    tyre = await BikeTyre.findById(id); // If not found, try finding it in BikeTyre collection
  }

  if (!tyre) {
    return res.status(404).send({ message: `Tyre with ID ${id} not found `});
  }

  try {
    tyre.active = active; // Update the active status
    await tyre.save(); // Save the updated tyre

    res.send({ message: `Tyre with ID ${id} updated successfully, tyre `});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error updating active status of tyre with ID ${id}` });
  }

}

const ShowDetails = async (req, res) => {
  try {
      const { id, tyreType } = req.params;

      let TyreModel;
      
      // Fetch the tyre details
      if (tyreType === 'car') {
          TyreModel = await CarTyre.findById(id).exec();
      } else if (tyreType === 'bike') {
          TyreModel = await BikeTyre.findById(id).exec();
      } else {
          return res.status(400).json({ message: "Invalid tyreType. It must be 'car' or 'bike'." });
      }

      // If no tyre found, return a 404
      if (!TyreModel) {
          return res.status(404).json({ message: "Tyre not found" });
      }

      // Resolve names for car brands and models
      const carBrandNames = await CarBrand.find({ _id: { $in: TyreModel.carbrand } });
      const carModelNames = await CarModel.find({ _id: { $in: TyreModel.carModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

      // Map to get an array of names and images for tyre brands
      const resolvedCarBrands = carBrandNames.map(brand => brand.name);
      const resolvedCarModels = carModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
          name: brand.name,
          image: brand.image  // Include image URL or path
      }));

      // Attach resolved names and images to the tyre model
      const result = {
          ...TyreModel.toObject(), // Convert to plain object
          carbrand: resolvedCarBrands,
          carModel: resolvedCarModels,
          tyreBrand: resolvedTyreBrands,
      };

      // Send the resolved tyre model as the response
      res.json(result);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting tyres" });
  }
};

const GetCheckbox = async(req,res) =>{
  const { selectedBrands, tyreTypes } = req.query;

  const filters = {};
  const brandsArray = selectedBrands ? JSON.parse(selectedBrands) : {};

  try {
    // Fetch tyres based on tyre type and brand selection
    let carTyres = [];
    let bikeTyres = [];

    // Check if car tyre type is selected and filter accordingly
    if (tyreTypes && JSON.parse(tyreTypes).car) {
      carTyres = await CarTyre.find({
        tyreType: 'car',
        tyreBrand: { $in: brandsArray.car || [] }
      });
    }

    // Check if bike tyre type is selected and filter accordingly
    if (tyreTypes && JSON.parse(tyreTypes).bike) {
      bikeTyres = await BikeTyre.find({
        tyreType: 'bike',
        tyreBrand: { $in: brandsArray.bike || [] }
      });
    }

    // Combine both car and bike results if both types are selected
    const filteredTyres = [...carTyres, ...bikeTyres];
    res.json(filteredTyres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tyres' });
  }



}



export {
    addRegisterFunction,
    addLoginFunction,
    addProductFunction,
    showProductFunction,
    showFunction,
    updateFunction,
    deleteFunction,
    SearchFunction,
    TyreActive,
    ShowDetails,
    GetCheckbox,
   
    
}