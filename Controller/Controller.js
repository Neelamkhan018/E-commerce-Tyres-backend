
import  {Accessories, AlloyWheel, Battery, BikeTyre, CarTyre, TractorTyre, TruckTyre} from "../Models/adminModel.js";
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
import TruckBrand from "../Models/TruckBrand.js";
import TruckModel from "../Models/TruckModel.js";
import TractorBrand from "../Models/TractorBrand.js";
import TractorModel from "../Models/TractorModel.js"
import BatteryModel from "../Models/BatteryModel.js"
import BatteryBrand from "../Models/Batterybrand.js";
import AlloyWheelBrand from "../Models/AlloyWheelbrand.js";
import AlloyWheelModel from "../Models/AlloyWheelModel.js";
import AccessoriesBrand from "../Models/Accessoriesbrand.js";
import AccessoriesModel from "../Models/AccessoriesModel.js";


import upload from "../utils/upload.js"


const ObjectId = mongoose.Types.ObjectId;


// const storage = multer.diskStorage({
//   destination: './uploads/', // Folder where files will be stored
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Create multer instance to handle file uploads
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
// }).fields([
//   { name: 'avatar', maxCount: 1 }, 
//   { name: 'thumb1', maxCount: 1 },  
//   { name: 'thumb2', maxCount: 1 },  
//   { name: 'thumb3', maxCount: 1 },  
//   { name: 'thumb4', maxCount: 1 },  
//   { name: 'thumb5', maxCount: 1 },  
//   { name: 'thumb6', maxCount: 1 }   
// ]);





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




// //added tractor
// const addProductFunction = async (req, res) => {
//   try {
//     upload(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         console.error("Multer error:", err);
//         return res.status(500).send({ message: "Multer error: " + err.message });
//       } else if (err) {
//         console.error("Unknown error:", err);
//         return res.status(500).send({ message: "Unknown error: " + err.message });
//       }

//       if (!req.body || !req.files) {
//         return res.status(400).send({ message: "No data or files uploaded" });
//       }

//       const {
//         title, slug, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
//         bikeBrand, bikeModel, truckBrand, truckModel, tyreBrand, width, height, customs,
//         seasons, speedRating, loadCapacity, price, Salesprice, description,
//         description1, warranty, city, state, manufactureMonth, manufactureYear,
//         fronttyre, reartyre, material, tractorBrand, tractorModel
//       } = req.body;

//       console.log("Request Body:", req.body);
//       console.log("Uploaded Files:", req.files);

//       let addresses = [];
//       try {
//         addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
//         console.log("Parsed Addresses:", addresses);
//       } catch (e) {
//         console.error("Error parsing addresses:", e);
//         return res.status(400).send({ message: "Invalid addresses format" });
//       }

//       const avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : null;
//       const thumbImages = Array.from({ length: 6 }, (_, i) => req.files[`thumb${i + 1}`]?.[0]?.filename || null);

//       try {
//         if (tyreType === 'car') {
//           const carTyre = new CarTyre({
//             title, slug, tyreType, carbrand, carModel, tyreBrand, width, addresses,
//             height, customs, seasons, speedRating, loadCapacity, material, manufactureMonth,
//             manufactureYear, avatarImages, thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
//             thumb3Images: thumbImages[2], thumb4Images: thumbImages[3], thumb5Images: thumbImages[4],
//             thumb6Images: thumbImages[5], price, Salesprice, description, description1,
//             warranty, city, state, pinCode, details
//           });
//           await carTyre.save();
//           res.send({ message: "Car tyre added successfully" });

//         } else if (tyreType === 'bike') {
//           const bikeTyre = new BikeTyre({
//             title, slug, tyreType, bikeBrand, bikeModel, tyreBrand, width, addresses,
//             height, customs, seasons, fronttyre, reartyre, speedRating, loadCapacity,
//             material, avatarImages, thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
//             thumb3Images: thumbImages[2], thumb4Images: thumbImages[3], thumb5Images: thumbImages[4],
//             thumb6Images: thumbImages[5], manufactureMonth, manufactureYear, price,
//             Salesprice, description, description1, warranty, city, state, pinCode, details
//           });
//           await bikeTyre.save();
//           res.send({ message: "Bike tyre added successfully" });

//         } else if (tyreType === 'truck') {
//           const truckTyre = new TruckTyre({
//             title, slug, tyreType, truckBrand: Array.isArray(truckBrand) ? truckBrand : [truckBrand], 
//             truckModel: Array.isArray(truckModel) ? truckModel : [truckModel], 
//             tyreBrand, width, addresses, height, customs, seasons, speedRating, 
//             loadCapacity, material, manufactureMonth, manufactureYear, avatarImages,
//             thumb1Images: thumbImages[0], thumb2Images: thumbImages[1], 
//             thumb3Images: thumbImages[2], thumb4Images: thumbImages[3], 
//             thumb5Images: thumbImages[4], thumb6Images: thumbImages[5], 
//             price, Salesprice, description, description1, warranty, city, state, pinCode, details
//           });
//           await truckTyre.save();
//           res.send({ message: "Truck tyre added successfully" });

//         } else if (tyreType === 'tractor') {
//           const tractorTyre = new TractorTyre({
//             title, slug, tyreType, tractorBrand: Array.isArray(tractorBrand) ? tractorBrand : [tractorBrand],
//             tractorModel: Array.isArray(tractorModel) ? tractorModel : [tractorModel],
//             tyreBrand, width, addresses, height, customs, seasons, speedRating,
//             loadCapacity, material, manufactureMonth, manufactureYear, avatarImages,
//             thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
//             thumb3Images: thumbImages[2], thumb4Images: thumbImages[3],
//             thumb5Images: thumbImages[4], thumb6Images: thumbImages[5],
//             price, Salesprice, description, description1, warranty, city, state, pinCode, details
//           });
//           await tractorTyre.save();
//           res.send({ message: "Tractor tyre added successfully" });

//         } else {
//           res.status(400).send({ message: "Invalid tyre type" });
//         }

//       } catch (err) {
//         console.error("Error saving tyre data:", err);
//         res.status(500).send({ message: "Error saving tyre data" });
//       }
//     });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     res.status(500).send({ message: "Error processing request" });
//   }
// };



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
        title, slug, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
        bikeBrand, bikeModel, truckBrand, truckModel, tyreBrand, width, height, customs,
        seasons, speedRating, loadCapacity, price, Salesprice, description, quantity ,
        description1, warranty, city, state, manufactureMonth, manufactureYear,
        fronttyre, reartyre, material, tractorBrand, tractorModel,
        // New fields for Battery
        batteryType, BatteryBrand, BatteryModel, capacity, voltage, batteryweight, batteryheight ,
        alloywheelType, Color, WheelSize, Holes, PCD, alloywheelBrand, alloywheelModel ,
        accessoryBrand, accessoryModel, accessoryType
      } = req.body;

      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);

      let addresses = [];
      try {
        addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
        console.log("Parsed Addresses:", addresses);
      } catch (e) {
        console.error("Error parsing addresses:", e);
        return res.status(400).send({ message: "Invalid addresses format" });
      }

      // const avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : null;
      // const thumbImages = Array.from({ length: 6 }, (_, i) => req.files[`thumb${i + 1}`]?.[0]?.filename || null);

      const avatarImages = req.files['avatar'] ? req.files['avatar'][0].location : null;
      const thumbImages = Array.from({ length: 6 }, (_, i) =>
        req.files[`thumb${i + 1}`]?.[0]?.location || null
      );
  
      

      try {
        if (tyreType === 'car') {
          const carTyre = new CarTyre({
            title, slug, tyreType, carbrand, carModel, tyreBrand, width, addresses,
            height, customs, seasons, speedRating, loadCapacity, material, manufactureMonth,
            manufactureYear, avatarImages, thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
            thumb3Images: thumbImages[2], thumb4Images: thumbImages[3], thumb5Images: thumbImages[4],
            thumb6Images: thumbImages[5], price, Salesprice, description, description1,
            warranty, city, state, pinCode, details
          });
          await carTyre.save();
          res.send({ message: "Car tyre added successfully" });

        } else if (tyreType === 'bike') {
          const bikeTyre = new BikeTyre({
            title, slug, tyreType, bikeBrand, bikeModel, tyreBrand, width, addresses,
            height, customs, seasons, fronttyre, reartyre, speedRating, loadCapacity,
            material, avatarImages, thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
            thumb3Images: thumbImages[2], thumb4Images: thumbImages[3], thumb5Images: thumbImages[4],
            thumb6Images: thumbImages[5], manufactureMonth, manufactureYear, price,
            Salesprice, description, description1, warranty, city, state, pinCode, details
          });
          await bikeTyre.save();
          res.send({ message: "Bike tyre added successfully" });

        } else if (tyreType === 'truck') {
          const truckTyre = new TruckTyre({
            title, slug, tyreType, truckBrand: Array.isArray(truckBrand) ? truckBrand : [truckBrand], 
            truckModel: Array.isArray(truckModel) ? truckModel : [truckModel], 
            tyreBrand, width, addresses, height, customs, seasons, speedRating, 
            loadCapacity, material, manufactureMonth, manufactureYear, avatarImages,
            thumb1Images: thumbImages[0], thumb2Images: thumbImages[1], 
            thumb3Images: thumbImages[2], thumb4Images: thumbImages[3], 
            thumb5Images: thumbImages[4], thumb6Images: thumbImages[5], 
            price, Salesprice, description, description1, warranty, city, state, pinCode, details
          });
          await truckTyre.save();
          res.send({ message: "Truck tyre added successfully" });

        } else if (tyreType === 'tractor') {
          const tractorTyre = new TractorTyre({
            title, slug, tyreType, tractorBrand: Array.isArray(tractorBrand) ? tractorBrand : [tractorBrand],
            tractorModel: Array.isArray(tractorModel) ? tractorModel : [tractorModel],
            tyreBrand, width, addresses, height, customs, seasons, speedRating,
            loadCapacity, material, manufactureMonth, manufactureYear, avatarImages,
            thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
            thumb3Images: thumbImages[2], thumb4Images: thumbImages[3],
            thumb5Images: thumbImages[4], thumb6Images: thumbImages[5],
            price, Salesprice, description, description1, warranty, city, state, pinCode, details
          });
          await tractorTyre.save();
          res.send({ message: "Tractor tyre added successfully" });

        } else if (tyreType === 'battery') {
          let carBrands = [];
          let carModels = [];
          let bikeBrands = [];
          let bikeModels = [];
        
          if (batteryType === 'car') {

            carBrands = Array.isArray(carbrand) ? [...new Set(carbrand)] : [carbrand];
            carModels = Array.isArray(carModel) ? [...new Set(carModel)] : [carModel];
          
          
          } else if (batteryType === 'bike') {
            
            bikeBrands = Array.isArray(bikeBrand) ? [...new Set(bikeBrand)] : [bikeBrand];
            bikeModels = Array.isArray(bikeModel) ? [...new Set(bikeModel)] : [bikeModel];
          
          }

          const battery = new Battery({
            title, slug, tyreType, batteryType, BatteryBrand, BatteryModel,
            carbrand: carBrands, carModel: carModels,
            bikeBrand: bikeBrands, bikeModel: bikeModels,
            capacity, voltage, batteryweight, batteryheight,
            addresses, avatarImages, manufactureMonth, manufactureYear, tyreBrand,
            thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
            thumb3Images: thumbImages[2], thumb4Images: thumbImages[3],
            thumb5Images: thumbImages[4], thumb6Images: thumbImages[5],
            price, Salesprice, description, description1, warranty, city, state, pinCode, details
          });
      
          await battery.save();
          res.send({ message: "Battery added successfully" });

        } else if (tyreType === 'alloywheel') {
          let carBrands = [];
          let carModels = [];
          let bikeBrands = [];
          let bikeModels = [];
          
          // Check if the alloywheelType is for a car or bike
          if (alloywheelType === 'car') {

            carBrands = Array.isArray(carbrand) ? [...new Set(carbrand)] : [carbrand];
            carModels = Array.isArray(carModel) ? [...new Set(carModel)] : [carModel];

          } else if (alloywheelType === 'bike') {

            bikeBrands = Array.isArray(bikeBrand) ? [...new Set(bikeBrand)] : [bikeBrand];
            bikeModels = Array.isArray(bikeModel) ? [...new Set(bikeModel)] : [bikeModel];

          }
        
          // Create and save the AlloyWheel document
          const alloyWheel = new AlloyWheel({
            title, slug, tyreType, alloywheelType, Color, WheelSize, Holes, PCD, alloywheelBrand, alloywheelModel,
            carbrand: carBrands, carModel: carModels, tyreBrand , quantity , seasons , 
            bikeBrand: bikeBrands, bikeModel: bikeModels,
            addresses, avatarImages, manufactureMonth, manufactureYear,
            price, Salesprice, description, description1, warranty, city, state, pinCode, details,
            thumb1Images: thumbImages[0], thumb2Images: thumbImages[1],
            thumb3Images: thumbImages[2], thumb4Images: thumbImages[3],
            thumb5Images: thumbImages[4], thumb6Images: thumbImages[5]
          });
        
          await alloyWheel.save();
          res.send({ message: "Alloy wheel added successfully" });
        
        } else if (tyreType === 'accessories') {

          const accessory = new Accessories({
            title,slug,tyreType,accessoryType,description,description1,price,Salesprice,tyreBrand ,
            accessoryBrand: Array.isArray(accessoryBrand) ? [...new Set(accessoryBrand)] : [accessoryBrand],
            accessoryModel: Array.isArray(accessoryModel) ? [...new Set(accessoryModel)] : [accessoryModel],
            warranty,quantity,manufactureMonth,manufactureYear,avatarImages,
            thumb1Images: thumbImages[0],
            thumb2Images: thumbImages[1],
            thumb3Images: thumbImages[2],
            thumb4Images: thumbImages[3],
            thumb5Images: thumbImages[4],
            thumb6Images: thumbImages[5],
            addresses, city, state, pinCode, details,
          });
        
          await accessory.save();
          res.send({ message: "Accessory added successfully" });

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







//-------------------------product list show api ---------------------------------


// const showProductFunction = async (req, res) => {
//   try {
//     // Fetch all car tyres, bike tyres, truck tyres, tractor tyres, and batteries asynchronously
//     const [carTyres, bikeTyres, truckTyres, tractorTyres, batteries] = await Promise.all([
//       CarTyre.find().exec(),
//       BikeTyre.find().exec(),
//       TruckTyre.find().exec(),
//       TractorTyre.find().exec(),
//       Battery.find().exec(), // Fetch batteries
//     ]);

//     // Helper function to validate if an ID is a valid ObjectId
//     const isValidObjectId = (id) => {
//       return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
//     };

//     // Helper function to map valid brand or model IDs to names
//     const getNamesByIds = async (ids, model) => {
//       const names = await Promise.all(
//         ids
//           .filter(isValidObjectId)  // Filter out invalid ObjectIds
//           .map(async (id) => {
//             const item = await model.findOne({ _id: new ObjectId(id) });
//             return item ? item.name : null;
//           })
//       );
//       return names.filter((name) => name); // Remove null values if any
//     };

//     // Helper function to safely split and process IDs
//     const safeSplit = (value) => {
//       if (value && typeof value === 'string') {
//         return value.split(",");
//       } else if (Array.isArray(value)) {
//         return value;  // If it's already an array, return it as is
//       }
//       return [];  // Return an empty array for any other case
//     };

//     // Update car tyres with corresponding brand, model, and tyre brand names
//     const updatedCarTyres = await Promise.all(
//       (carTyres || []).map(async (tyre) => {
//         const carBrandIds = safeSplit(tyre.carbrand && tyre.carbrand[0]);
//         const carModelIds = safeSplit(tyre.carModel && tyre.carModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const carBrandNames = await getNamesByIds(carBrandIds, CarBrand);
//         const carModelNames = await getNamesByIds(carModelIds, CarModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           carbrand: carBrandNames,
//           carModel: carModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update bike tyres with corresponding brand, model, and tyre brand names
//     const updatedBikeTyres = await Promise.all(
//       (bikeTyres || []).map(async (tyre) => {
//         const bikeBrandIds = safeSplit(tyre.bikeBrand && tyre.bikeBrand[0]);
//         const bikeModelIds = safeSplit(tyre.bikeModel && tyre.bikeModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const bikeBrandNames = await getNamesByIds(bikeBrandIds, BikeBrand);
//         const bikeModelNames = await getNamesByIds(bikeModelIds, BikeModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           bikeBrand: bikeBrandNames,
//           bikeModel: bikeModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update truck tyres with corresponding brand, model, and tyre brand names
//     const updatedTruckTyres = await Promise.all(
//       (truckTyres || []).map(async (tyre) => {
//         const truckBrandIds = safeSplit(tyre.truckBrand && tyre.truckBrand[0]);
//         const truckModelIds = safeSplit(tyre.truckModel && tyre.truckModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const truckBrandNames = await getNamesByIds(truckBrandIds, TruckBrand);
//         const truckModelNames = await getNamesByIds(truckModelIds, TruckModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           truckBrand: truckBrandNames,
//           truckModel: truckModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update tractor tyres with corresponding brand, model, and tyre brand names
//     const updatedTractorTyres = await Promise.all(
//       (tractorTyres || []).map(async (tyre) => {
//         const tractorBrandIds = safeSplit(tyre.tractorBrand && tyre.tractorBrand[0]);
//         const tractorModelIds = safeSplit(tyre.tractorModel && tyre.tractorModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const tractorBrandNames = await getNamesByIds(tractorBrandIds, TractorBrand);
//         const tractorModelNames = await getNamesByIds(tractorModelIds, TractorModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           tractorBrand: tractorBrandNames,
//           tractorModel: tractorModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update batteries with corresponding brand, model, and tyre brand names
//     const updatedBatteries = await Promise.all(
//       (batteries || []).map(async (battery) => {
//         const batteryBrandIds = safeSplit(battery.BatteryBrand && battery.BatteryBrand[0]);
//         const batteryModelIds = safeSplit(battery.BatteryModel && battery.BatteryModel[0]);
//         const tyreBrandIds = safeSplit(battery.tyreBrand && battery.tyreBrand[0]);
    
//         const batteryBrandNames = await getNamesByIds(batteryBrandIds, BatteryBrand);
//         const batteryModelNames = await getNamesByIds(batteryModelIds, BatteryModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);
    
//         // Default to empty arrays
//         let carbrandNames = [];
//         let carModelNames = [];
//         let bikeBrandNames = [];
//         let bikeModelNames = [];
    
//         if (battery.batteryType === 'car') {
//           // Assuming you already have these car brand/model selections available
//           // Replace with actual logic to fetch these car brand/model IDs
//           const selectedCarBrandIds = safeSplit(battery.carbrand);
//           const selectedCarModelIds = safeSplit(battery.carModel);
    
//           // Map car brand/model IDs to their respective names using your existing brand/model data
//           carbrandNames = await getNamesByIds(selectedCarBrandIds, CarBrand);
//           carModelNames = await getNamesByIds(selectedCarModelIds, CarModel);
//         } else if (battery.batteryType === 'bike') {

//           const selectedBikeBrandIds = safeSplit(battery.bikeBrand);
//           const selectedBikeModelIds = safeSplit(battery.bikeModel);
    

//           bikeBrandNames =  await getNamesByIds(selectedBikeBrandIds, BikeBrand);
//           bikeModelNames =  await getNamesByIds(selectedBikeModelIds, BikeModel); // Use the battery brand names for bike// Use the battery model names for bike
//         }
    
//         return {
//           ...battery.toObject(),
//           BatteryBrand: batteryBrandNames,
//           BatteryModel: batteryModelNames,
//           tyreBrand: tyreBrandNames,
//           carbrand: carbrandNames,  // Include car brand names
//           carModel: carModelNames,  // Include car model names
//           bikeBrand: bikeBrandNames,  // Include bike brand names
//           bikeModel: bikeModelNames,  // Include bike model names
//         };
//       })
//     );
    

//     // Combine updated car, bike, truck, tractor tyres, and batteries
//     const products = [
//       ...updatedCarTyres,
//       ...updatedBikeTyres,
//       ...updatedTruckTyres,
//       ...updatedTractorTyres,
//       ...updatedBatteries, // Include batteries
//     ];

//     // Send response with the combined product data
//     res.send(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error getting products" });
//   }
// };

// const showProductFunction = async (req, res) => {
//   try {
//     // Fetch all car tyres, bike tyres, truck tyres, tractor tyres, batteries, and alloy wheels asynchronously
//     const [carTyres, bikeTyres, truckTyres, tractorTyres, batteries, alloyWheels , accessories] = await Promise.all([
//       CarTyre.find().exec(),
//       BikeTyre.find().exec(),
//       TruckTyre.find().exec(),
//       TractorTyre.find().exec(),
//       Battery.find().exec(), // Fetch batteries
//       AlloyWheel.find().exec(), // Fetch alloy wheels
//       Accessories.find().exec()  
      
//     ]);

//     // Helper function to validate if an ID is a valid ObjectId
//     const isValidObjectId = (id) => {
//       return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
//     };

//     // Helper function to map valid brand or model IDs to names
//     const getNamesByIds = async (ids, model) => {
//       const names = await Promise.all(
//         ids
//           .filter(isValidObjectId)  // Filter out invalid ObjectIds
//           .map(async (id) => {
//             const item = await model.findOne({ _id: new ObjectId(id) });
//             return item ? item.name : null;
//           })
//       );
//       return names.filter((name) => name); // Remove null values if any
//     };

//     // Helper function to safely split and process IDs
//     const safeSplit = (value) => {
//       if (value && typeof value === 'string') {
//         return value.split(",");
//       } else if (Array.isArray(value)) {
//         return value;  // If it's already an array, return it as is
//       }
//       return [];  // Return an empty array for any other case
//     };

//     // Update car tyres with corresponding brand, model, and tyre brand names
//     const updatedCarTyres = await Promise.all(
//       (carTyres || []).map(async (tyre) => {
//         const carBrandIds = safeSplit(tyre.carbrand && tyre.carbrand[0]);
//         const carModelIds = safeSplit(tyre.carModel && tyre.carModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const carBrandNames = await getNamesByIds(carBrandIds, CarBrand);
//         const carModelNames = await getNamesByIds(carModelIds, CarModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           carbrand: carBrandNames,
//           carModel: carModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update bike tyres with corresponding brand, model, and tyre brand names
//     const updatedBikeTyres = await Promise.all(
//       (bikeTyres || []).map(async (tyre) => {
//         const bikeBrandIds = safeSplit(tyre.bikeBrand && tyre.bikeBrand[0]);
//         const bikeModelIds = safeSplit(tyre.bikeModel && tyre.bikeModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const bikeBrandNames = await getNamesByIds(bikeBrandIds, BikeBrand);
//         const bikeModelNames = await getNamesByIds(bikeModelIds, BikeModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           bikeBrand: bikeBrandNames,
//           bikeModel: bikeModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update truck tyres with corresponding brand, model, and tyre brand names
//     const updatedTruckTyres = await Promise.all(
//       (truckTyres || []).map(async (tyre) => {
//         const truckBrandIds = safeSplit(tyre.truckBrand && tyre.truckBrand[0]);
//         const truckModelIds = safeSplit(tyre.truckModel && tyre.truckModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const truckBrandNames = await getNamesByIds(truckBrandIds, TruckBrand);
//         const truckModelNames = await getNamesByIds(truckModelIds, TruckModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           truckBrand: truckBrandNames,
//           truckModel: truckModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update tractor tyres with corresponding brand, model, and tyre brand names
//     const updatedTractorTyres = await Promise.all(
//       (tractorTyres || []).map(async (tyre) => {
//         const tractorBrandIds = safeSplit(tyre.tractorBrand && tyre.tractorBrand[0]);
//         const tractorModelIds = safeSplit(tyre.tractorModel && tyre.tractorModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

//         const tractorBrandNames = await getNamesByIds(tractorBrandIds, TractorBrand);
//         const tractorModelNames = await getNamesByIds(tractorModelIds, TractorModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

//         return {
//           ...tyre.toObject(),
//           tractorBrand: tractorBrandNames,
//           tractorModel: tractorModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Update batteries with corresponding brand, model, and tyre brand names
//     const updatedBatteries = await Promise.all(
//       (batteries || []).map(async (battery) => {
//         const batteryBrandIds = safeSplit(battery.BatteryBrand && battery.BatteryBrand[0]);
//         const batteryModelIds = safeSplit(battery.BatteryModel && battery.BatteryModel[0]);
//         const tyreBrandIds = safeSplit(battery.tyreBrand && battery.tyreBrand[0]);
    
//         const batteryBrandNames = await getNamesByIds(batteryBrandIds, BatteryBrand);
//         const batteryModelNames = await getNamesByIds(batteryModelIds, BatteryModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);
    
//         let carbrandNames = [];
//         let carModelNames = [];
//         let bikeBrandNames = [];
//         let bikeModelNames = [];
    
//         if (battery.batteryType === 'car') {
//           const selectedCarBrandIds = safeSplit(battery.carbrand);
//           const selectedCarModelIds = safeSplit(battery.carModel);
    
//           carbrandNames = await getNamesByIds(selectedCarBrandIds, CarBrand);
//           carModelNames = await getNamesByIds(selectedCarModelIds, CarModel);
//         } else if (battery.batteryType === 'bike') {
//           const selectedBikeBrandIds = safeSplit(battery.bikeBrand);
//           const selectedBikeModelIds = safeSplit(battery.bikeModel);
    
//           bikeBrandNames =  await getNamesByIds(selectedBikeBrandIds, BikeBrand);
//           bikeModelNames =  await getNamesByIds(selectedBikeModelIds, BikeModel);
//         }
    
//         return {
//           ...battery.toObject(),
//           BatteryBrand: batteryBrandNames,
//           BatteryModel: batteryModelNames,
//           tyreBrand: tyreBrandNames,
//           carbrand: carbrandNames,
//           carModel: carModelNames,
//           bikeBrand: bikeBrandNames,
//           bikeModel: bikeModelNames,
//         };
//       })
//     );

//     // Update alloy wheels with corresponding brand and model names
//     const updatedAlloyWheels = await Promise.all(
//       (alloyWheels || []).map(async (wheel) => {

//         const alloyBrandIds = safeSplit(wheel.alloywheelBrand && wheel.alloywheelBrand[0]);
//         const alloyModelIds = safeSplit(wheel.alloywheelModel && wheel.alloywheelModel[0]);
//         const tyreBrandIds = safeSplit(wheel.tyreBrand && wheel.tyreBrand[0]);

//         const alloyBrandNames = await getNamesByIds(alloyBrandIds, AlloyWheelBrand);
//         const alloyModelNames = await getNamesByIds(alloyModelIds, AlloyWheelModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);


//         let carbrandNames = [];
//         let carModelNames = [];
//         let bikeBrandNames = [];
//         let bikeModelNames = [];
    
//         if (wheel.alloywheelType === 'car') {
//           const selectedCarBrandIds = safeSplit(wheel.carbrand);
//           const selectedCarModelIds = safeSplit(wheel.carModel);
    
//           carbrandNames = await getNamesByIds(selectedCarBrandIds, CarBrand);
//           carModelNames = await getNamesByIds(selectedCarModelIds, CarModel);

//         } else if (wheel.alloywheelType === 'bike') {
//           const selectedBikeBrandIds = safeSplit(wheel.bikeBrand);
//           const selectedBikeModelIds = safeSplit(wheel.bikeModel);
    
//           bikeBrandNames =  await getNamesByIds(selectedBikeBrandIds, BikeBrand);
//           bikeModelNames =  await getNamesByIds(selectedBikeModelIds, BikeModel);
//         }


//         return {
//           ...wheel.toObject(),
//           alloywheelBrand: alloyBrandNames,
//           alloywheelModel: alloyModelNames,
//           tyreBrand: tyreBrandNames,
//           carbrand: carbrandNames,
//           carModel: carModelNames,
//           bikeBrand: bikeBrandNames,
//           bikeModel: bikeModelNames,
//         };
        
//       })
//     );

//     // Update accessories with corresponding brand and model names
// const updatedAccessories = await Promise.all(
//   (Accessories || []).map(async (accessory) => {
//     const accessoryBrandIds = safeSplit(accessory.accessoryBrand && accessory.accessoryBrand[0]);
//     const accessoryModelIds = safeSplit(accessory.accessoryModel && accessory.accessoryModel[0]);
//     const tyreBrandIds = safeSplit(accessory.tyreBrand && accessory.tyreBrand[0]);

    
//     const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);



//     if (accessory.accessoryType === 'car') {

    
//     } else if (accessory.accessoryType === 'bike') {
      
//     }

//     return {
//       ...accessory.toObject(),
//       accessoryBrand: accessoryBrandNames,
//       accessoryModel: accessoryModelNames,
//       tyreBrand: tyreBrandNames,
     
//     };
//   })
// );




//     // Combine updated car, bike, truck, tractor tyres, batteries, and alloy wheels
//     const products = [
//       ...updatedCarTyres,
//       ...updatedBikeTyres,
//       ...updatedTruckTyres,
//       ...updatedTractorTyres,
//       ...updatedBatteries,
//       ...updatedAlloyWheels, 
//       ...updatedAccessories, 
//     ];

//     // Send response with the combined product data
//     res.send(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error getting products" });
//   }
// };


const showProductFunction = async (req, res) => {
  try {
    // Fetch all car tyres, bike tyres, truck tyres, tractor tyres, batteries, alloy wheels, and accessories asynchronously
    const [carTyres, bikeTyres, truckTyres, tractorTyres, batteries, alloyWheels, accessories] = await Promise.all([
      CarTyre.find().exec(),
      BikeTyre.find().exec(),
      TruckTyre.find().exec(),
      TractorTyre.find().exec(),
      Battery.find().exec(),
      AlloyWheel.find().exec(),
      Accessories.find().exec()
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

    // Helper function to safely split and process IDs
    const safeSplit = (value) => {
      if (value && typeof value === 'string') {
        return value.split(",");
      } else if (Array.isArray(value)) {
        return value;  // If it's already an array, return it as is
      }
      return [];  // Return an empty array for any other case
    };

    // Update car tyres with corresponding brand, model, and tyre brand names
    const updatedCarTyres = await Promise.all(
      (carTyres || []).map(async (tyre) => {
        const carBrandIds = safeSplit(tyre.carbrand && tyre.carbrand[0]);
        const carModelIds = safeSplit(tyre.carModel && tyre.carModel[0]);
        const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

        const carBrandNames = await getNamesByIds(carBrandIds, CarBrand);
        const carModelNames = await getNamesByIds(carModelIds, CarModel);
        const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

        return {
          ...tyre.toObject(),
          carbrand: carBrandNames,
          carModel: carModelNames,
          tyreBrand: tyreBrandNames,
        };
      })
    );

    // Update bike tyres with corresponding brand, model, and tyre brand names
    const updatedBikeTyres = await Promise.all(
      (bikeTyres || []).map(async (tyre) => {
        const bikeBrandIds = safeSplit(tyre.bikeBrand && tyre.bikeBrand[0]);
        const bikeModelIds = safeSplit(tyre.bikeModel && tyre.bikeModel[0]);
        const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

        const bikeBrandNames = await getNamesByIds(bikeBrandIds, BikeBrand);
        const bikeModelNames = await getNamesByIds(bikeModelIds, BikeModel);
        const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

        return {
          ...tyre.toObject(),
          bikeBrand: bikeBrandNames,
          bikeModel: bikeModelNames,
          tyreBrand: tyreBrandNames,
        };
      })
    );

    // Update truck tyres with corresponding brand, model, and tyre brand names
    const updatedTruckTyres = await Promise.all(
      (truckTyres || []).map(async (tyre) => {
        const truckBrandIds = safeSplit(tyre.truckBrand && tyre.truckBrand[0]);
        const truckModelIds = safeSplit(tyre.truckModel && tyre.truckModel[0]);
        const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);

        const truckBrandNames = await getNamesByIds(truckBrandIds, TruckBrand);
        const truckModelNames = await getNamesByIds(truckModelIds, TruckModel);
        const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);

        return {
          ...tyre.toObject(),
            truckBrand: truckBrandNames,
            truckModel: truckModelNames,
            tyreBrand: tyreBrandNames,
          };
        })
      );
  
      // Update tractor tyres with corresponding brand, model, and tyre brand names
      const updatedTractorTyres = await Promise.all(
        (tractorTyres || []).map(async (tyre) => {
          const tractorBrandIds = safeSplit(tyre.tractorBrand && tyre.tractorBrand[0]);
          const tractorModelIds = safeSplit(tyre.tractorModel && tyre.tractorModel[0]);
          const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);
  
          const tractorBrandNames = await getNamesByIds(tractorBrandIds, TractorBrand);
          const tractorModelNames = await getNamesByIds(tractorModelIds, TractorModel);
          const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);
  
          return {
            ...tyre.toObject(),
            tractorBrand: tractorBrandNames,
            tractorModel: tractorModelNames,
            tyreBrand: tyreBrandNames,
          };
        })
      );
  
      // Update batteries with corresponding brand, model, and tyre brand names
      const updatedBatteries = await Promise.all(
        (batteries || []).map(async (battery) => {
          const batteryBrandIds = safeSplit(battery.BatteryBrand && battery.BatteryBrand[0]);
          const batteryModelIds = safeSplit(battery.BatteryModel && battery.BatteryModel[0]);
          const tyreBrandIds = safeSplit(battery.tyreBrand && battery.tyreBrand[0]);
  
          const batteryBrandNames = await getNamesByIds(batteryBrandIds, BatteryBrand);
          const batteryModelNames = await getNamesByIds(batteryModelIds, BatteryModel);
          const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);
  
          let carbrandNames = [];
          let carModelNames = [];
          let bikeBrandNames = [];
          let bikeModelNames = [];
  
          if (battery.batteryType === 'car') {
            const selectedCarBrandIds = safeSplit(battery.carbrand);
            const selectedCarModelIds = safeSplit(battery.carModel);
  
            carbrandNames = await getNamesByIds(selectedCarBrandIds, CarBrand);
            carModelNames = await getNamesByIds(selectedCarModelIds, CarModel);
          } else if (battery.batteryType === 'bike') {
            const selectedBikeBrandIds = safeSplit(battery.bikeBrand);
            const selectedBikeModelIds = safeSplit(battery.bikeModel);
  
            bikeBrandNames = await getNamesByIds(selectedBikeBrandIds, BikeBrand);
            bikeModelNames = await getNamesByIds(selectedBikeModelIds, BikeModel);
          }
  
          return {
            ...battery.toObject(),
            BatteryBrand: batteryBrandNames,
            BatteryModel: batteryModelNames,
            tyreBrand: tyreBrandNames,
            carbrand: carbrandNames,
            carModel: carModelNames,
            bikeBrand: bikeBrandNames,
            bikeModel: bikeModelNames,
          };
        })
      );
  
      // Update alloy wheels with corresponding brand and model names
      const updatedAlloyWheels = await Promise.all(
        (alloyWheels || []).map(async (wheel) => {
          const alloyBrandIds = safeSplit(wheel.alloywheelBrand && wheel.alloywheelBrand[0]);
          const alloyModelIds = safeSplit(wheel.alloywheelModel && wheel.alloywheelModel[0]);
          const tyreBrandIds = safeSplit(wheel.tyreBrand && wheel.tyreBrand[0]);
  
          const alloyBrandNames = await getNamesByIds(alloyBrandIds, AlloyWheelBrand);
          const alloyModelNames = await getNamesByIds(alloyModelIds, AlloyWheelModel);
          const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);
  
          let carbrandNames = [];
          let carModelNames = [];
          let bikeBrandNames = [];
          let bikeModelNames = [];
  
          if (wheel.alloywheelType === 'car') {
            const selectedCarBrandIds = safeSplit(wheel.carbrand);
            const selectedCarModelIds = safeSplit(wheel.carModel);
  
            carbrandNames = await getNamesByIds(selectedCarBrandIds, CarBrand);
            carModelNames = await getNamesByIds(selectedCarModelIds, CarModel);
          } else if (wheel.alloywheelType === 'bike') {
            const selectedBikeBrandIds = safeSplit(wheel.bikeBrand);
            const selectedBikeModelIds = safeSplit(wheel.bikeModel);
  
            bikeBrandNames = await getNamesByIds(selectedBikeBrandIds, BikeBrand);
            bikeModelNames = await getNamesByIds(selectedBikeModelIds, BikeModel);
        }

        return {
          ...wheel.toObject(),
          alloywheelBrand: alloyBrandNames,
          alloywheelModel: alloyModelNames,
          tyreBrand: tyreBrandNames,
          carbrand: carbrandNames,
          carModel: carModelNames,
          bikeBrand: bikeBrandNames,
          bikeModel: bikeModelNames,
        };
      })
    );

// Update accessories with corresponding brand and model names
const updatedAccessories = await Promise.all(
  (accessories || []).map(async (accessory) => {
    const accessoryBrandIds = safeSplit(accessory.accessoryBrand && accessory.accessoryBrand[0]);
    const accessoryModelIds = safeSplit(accessory.accessoryModel && accessory.accessoryModel[0]);
    const tyreBrandIds = safeSplit(accessory.tyreBrand && accessory.tyreBrand[0]);

    let accessoryBrandNames = [];
    let accessoryModelNames = [];
    let tyreBrandNames = [];

    // Check the accessory type and fetch the corresponding brand and model names
    if (accessory.accessoryType === 'car' || accessory.accessoryType === 'bike') {
      accessoryBrandNames = await getNamesByIds(accessoryBrandIds, AccessoriesBrand);
      accessoryModelNames = await getNamesByIds(accessoryModelIds, AccessoriesModel);
    }

    // Fetch tyre brand names regardless of accessory type
    tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand); // <-- Make sure TyreBrand is imported

    // Return the updated accessory object with the correct brand and model names
    return {
      ...accessory.toObject(),
      accessoryBrand: accessoryBrandNames,
      accessoryModel: accessoryModelNames,
      tyreBrand: tyreBrandNames,
    };
  })
);


    // Combine updated car, bike, truck, tractor tyres, batteries, alloy wheels, and accessories
    const products = [
      ...updatedCarTyres,
      ...updatedBikeTyres,
      ...updatedTruckTyres,
      ...updatedTractorTyres,
      ...updatedBatteries,
      ...updatedAlloyWheels,
      ...updatedAccessories,
    ];

    // Send response with the combined product data
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting products" });
  }
};


 
// --------------------- update show form  previous data ------------------------------


const showFunction = async (req, res) => {
  try {
    const { id, tyreType } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    let productData;
    if (tyreType === 'car') {
      productData = await CarTyre.findById(id);
    } else if (tyreType === 'bike') {
      productData = await BikeTyre.findById(id);
    } else if (tyreType === 'truck') {
      productData = await TruckTyre.findById(id);
    } else if (tyreType === 'tractor') {
      productData = await TractorTyre.findById(id);
    } else if (tyreType === 'battery') {
      productData = await Battery.findById(id); // New condition for battery
    } else if (tyreType === 'alloywheel') {
      productData = await AlloyWheel.findById(id); // New condition for alloy wheel
    } else if (tyreType === 'accessories') {
      productData = await Accessories.findById(id); // New condition for accessories
    }

    if (!productData) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const convertedData = await convertIdsToNames(tyreType, productData._doc);
    res.json(convertedData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

async function convertIdsToNames(tyreType, data) {
  // Helper function to check if the ID is valid
  const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

  // Convert tyreBrand IDs to names
  const tyreBrandNames = await Promise.all(
    (Array.isArray(data.tyreBrand) ? data.tyreBrand : [data.tyreBrand]).map(async (id) => {
      if (isValidObjectId(id)) {
        const brand = await TyreBrand.findById(id);
        return brand ? brand.name : id;
      }
      return id; // Return the ID itself if it's not a valid ObjectId
    })
  );

  // Helper function to map brand and model IDs to names
  const getBrandAndModelNames = async (brandIds, modelIds, BrandModelClass) => {
    const brandNames = await Promise.all(
      (Array.isArray(brandIds) ? brandIds : [brandIds]).map(async (id) => {
        if (isValidObjectId(id)) {
          const brand = await BrandModelClass.findById(id);
          return brand ? brand.name : id;
        }
        return id; // Return the ID if it's not a valid ObjectId
      })
    );

    const modelNames = await Promise.all(
      (Array.isArray(modelIds) ? modelIds : [modelIds]).map(async (id) => {
        if (isValidObjectId(id)) {
          const model = await BrandModelClass.findById(id);
          return model ? model.name : id;
        }
        return id; // Return the ID if it's not a valid ObjectId
      })
    );

    return { brandNames, modelNames };
  };

  // Car tyres - Convert car brand and model IDs to names
  if (tyreType === 'car') {
    const { brandNames: carBrandNames, modelNames: carModelNames } = await getBrandAndModelNames(data.carBrand, data.carModel, CarBrand);
    return { ...data, carBrand: carBrandNames, carModel: carModelNames };
  }

  // Bike tyres - Convert bike brand and model IDs to names
  if (tyreType === 'bike') {
    const { brandNames: bikeBrandNames, modelNames: bikeModelNames } = await getBrandAndModelNames(data.bikeBrand, data.bikeModel, BikeBrand);
    return { ...data, bikeBrand: bikeBrandNames, bikeModel: bikeModelNames };
  }

  // Truck tyres - Convert truck brand and model IDs to names
  if (tyreType === 'truck') {
    const { brandNames: truckBrandNames, modelNames: truckModelNames } = await getBrandAndModelNames(data.truckBrand, data.truckModel, TruckBrand);
    return { ...data, truckBrand: truckBrandNames, truckModel: truckModelNames };
  }

  // Tractor tyres - Convert tractor brand and model IDs to names
  if (tyreType === 'tractor') {
    const { brandNames: tractorBrandNames, modelNames: tractorModelNames } = await getBrandAndModelNames(data.tractorBrand, data.tractorModel, TractorBrand);
    return { ...data, tractorBrand: tractorBrandNames, tractorModel: tractorModelNames };
  }

  // Battery - Convert battery brand and model IDs to names
  if (tyreType === 'battery') {
    const { brandNames: batteryBrandNames, modelNames: batteryModelNames } = await getBrandAndModelNames(data.batteryBrand, data.batteryModel, BatteryBrand);
    return { ...data, batteryBrand: batteryBrandNames, batteryModel: batteryModelNames };
  }

  // Alloy wheel - Convert alloy wheel brand and model IDs to names
  if (tyreType === 'alloywheel') {
    const { brandNames: alloywheelBrandNames, modelNames: alloywheelModelNames } = await getBrandAndModelNames(data.alloywheelBrand, data.alloywheelModel, AlloyWheelBrand);
    return { ...data, alloywheelBrand: alloywheelBrandNames, alloywheelModel: alloywheelModelNames };
  }

  // Accessories - Convert accessory brand and model IDs to names
  if (tyreType === 'accessories') {
    const { brandNames: accessoryBrandNames, modelNames: accessoryModelNames } = await getBrandAndModelNames(data.accessoryBrand, data.accessoryModel, AccessoriesBrand);
    return { ...data, accessoryBrand: accessoryBrandNames, accessoryModel: accessoryModelNames };
  }

  return data;
}


// //   // --------------UPDATE FUNCTION ----------------------


const updateFunction = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).send({ message: "Multer error: " + err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).send({ message: "Unknown error: " + err.message });
    }

    if (!req.body) {
      return res.status(400).send({ message: "No data uploaded" });
    }

    const { id } = req.params;
    const {
      title, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
      bikeBrand, bikeModel, tyreBrand, tyreModel, width, height, customs,
      seasons, speedRating, loadCapacity, price, Salesprice, description,
      description1, warranty, city, state, manufactureMonth, manufactureYear,
      fronttyre, reartyre, quantity, material, slug, batteryType, BatteryBrand, BatteryModel,
      capacity, voltage, batteryweight, batteryheight, alloywheelType, Color, WheelSize, Holes, PCD,
      alloywheelBrand, alloywheelModel, accessoryBrand, accessoryModel, accessoryType
    } = req.body;

    let ProductModel;

    switch (tyreType) {
      case 'car': ProductModel = CarTyre; break;
      case 'bike': ProductModel = BikeTyre; break;
      case 'truck': ProductModel = TruckTyre; break;
      case 'tractor': ProductModel = TractorTyre; break;
      case 'battery': ProductModel = Battery; break;
      case 'alloywheel': ProductModel = AlloyWheel; break;
      case 'accessories': ProductModel = Accessories; break;
      default:
        return res.status(400).send({ message: 'Invalid product type' });
    }

    let addresses = [];
    try {
      addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
    } catch (e) {
      console.error("Error parsing addresses:", e);
      return res.status(400).send({ message: "Invalid addresses format" });
    }

    try {
      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) {
        return res.status(404).send({ message: `Product with ID ${id} not found` });
      }

      // Handle image uploads and fallback to existing if no new image is uploaded
      const getImage = (key, fallback) => (req.files[key] ? req.files[key][0].location : fallback);
      const avatarImages = getImage('avatar', existingProduct.avatarImages || '');
      const thumb1Images = getImage('thumb1', existingProduct.thumb1Images || '');
      const thumb2Images = getImage('thumb2', existingProduct.thumb2Images || '');
      const thumb3Images = getImage('thumb3', existingProduct.thumb3Images || '');
      const thumb4Images = getImage('thumb4', existingProduct.thumb4Images || '');
      const thumb5Images = getImage('thumb5', existingProduct.thumb5Images || '');
      const thumb6Images = getImage('thumb6', existingProduct.thumb6Images || '');

      // Normalize fields to arrays if needed
      const normalizeArray = (val, fallback) => Array.isArray(val)
        ? val
        : val
        ? [val]
        : fallback;

      const newSlug = (typeof slug === 'string' && slug.trim() !== '')
        ? slug.trim()
        : existingProduct.slug;

      const updateData = {
        title: title || existingProduct.title,
        tyreType: tyreType || existingProduct.tyreType,
        carbrand: normalizeArray(carbrand, existingProduct.carbrand),
        addresses: addresses.length > 0 ? addresses : existingProduct.addresses,
        pinCode: pinCode || existingProduct.pinCode,
        details: details || existingProduct.details,
        carModel: normalizeArray(carModel, existingProduct.carModel),
        bikeBrand: normalizeArray(bikeBrand, existingProduct.bikeBrand),
        bikeModel: normalizeArray(bikeModel, existingProduct.bikeModel),
        tyreBrand: tyreBrand || existingProduct.tyreBrand,
        tyreModel: tyreModel || existingProduct.tyreModel,
        width: width || existingProduct.width,
        height: height || existingProduct.height,
        customs: customs || existingProduct.customs,
        seasons: seasons || existingProduct.seasons,
        speedRating: speedRating || existingProduct.speedRating,
        loadCapacity: loadCapacity || existingProduct.loadCapacity,
        price: price || existingProduct.price,
        Salesprice: Salesprice || existingProduct.Salesprice,
        description: description || existingProduct.description,
        description1: description1 || existingProduct.description1,
        warranty: warranty || existingProduct.warranty,
        city: city || existingProduct.city,
        state: state || existingProduct.state,
        manufactureMonth: manufactureMonth || existingProduct.manufactureMonth,
        manufactureYear: manufactureYear || existingProduct.manufactureYear,
        fronttyre: fronttyre || existingProduct.fronttyre,
        reartyre: reartyre || existingProduct.reartyre,
        quantity: quantity || existingProduct.quantity,
        material: material || existingProduct.material,
        slug: newSlug,
        batteryType: batteryType || existingProduct.batteryType,
        BatteryBrand: BatteryBrand || existingProduct.BatteryBrand,
        BatteryModel: BatteryModel || existingProduct.BatteryModel,
        capacity: capacity || existingProduct.capacity,
        voltage: voltage || existingProduct.voltage,
        batteryweight: batteryweight || existingProduct.batteryweight,
        batteryheight: batteryheight || existingProduct.batteryheight,
        alloywheelType: alloywheelType || existingProduct.alloywheelType,
        Color: Color || existingProduct.Color,
        WheelSize: WheelSize || existingProduct.WheelSize,
        Holes: Holes || existingProduct.Holes,
        PCD: PCD || existingProduct.PCD,
        alloywheelBrand: alloywheelBrand || existingProduct.alloywheelBrand,
        alloywheelModel: alloywheelModel || existingProduct.alloywheelModel,
        accessoryBrand: accessoryBrand || existingProduct.accessoryBrand,
        accessoryModel: accessoryModel || existingProduct.accessoryModel,
        accessoryType: accessoryType || existingProduct.accessoryType,
        avatarImages,
        thumb1Images, thumb2Images, thumb3Images, thumb4Images, thumb5Images, thumb6Images
      };

      // Update the product
      await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

      res.send({ message: "Product updated successfully" });
    } catch (err) {
      console.error("Error processing update:", err);
      res.status(500).send({ message: "Error processing update" });
    }
  });
};




// ------------------- delete function ------------------------


const deleteFunction = async (req, res) => {
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
    case 'truck':
      TyreModel = TruckTyre;
      break;
    case 'tractor':
      TyreModel = TractorTyre;
      break;
    case 'battery':  // Added battery support
      TyreModel = Battery;
      break;
    case 'alloywheel':  // Added alloy wheel support
      TyreModel = AlloyWheel; // Ensure you have an AlloyWheel model defined
      break;
    case 'accessories':  // Added accessories support
      TyreModel = Accessories; // Ensure you have an Accessories model defined
      break;
    default:
      return res.status(400).send({ message: 'Invalid type' });
  }

  try {
    const deletedItem = await TyreModel.deleteOne({ _id: id });
    if (deletedItem.deletedCount === 1) {
      res.send({ message: `${type.charAt(0).toUpperCase()}${type.slice(1)} with ID ${id} deleted` });
    } else {
      res.status(404).send({ message: `${type.charAt(0).toUpperCase()}${type.slice(1)} with ID ${id} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error deleting ${type}` });
  }
};


//----------------Search function of size api --------------

const SearchFunction = async (req, res) => {
  const { width, height, customs, seasons } = req.params;

  try {
    const query = {};

    if (width && width !== 'all') {
      query.width = width;
    }

    if (height && height !== 'all') {
      query.height = height;
    }

    if (customs && customs !== 'all') {
      query.customs = customs;
    }

    if (seasons && seasons !== 'all') {
      query.seasons = seasons;
    }

    // Fetch tyres from both CarTyre and BikeTyre models
    const carTyres = await CarTyre.find(query);
    const bikeTyres = await BikeTyre.find(query);

    // Combine results
    const tyres = [...carTyres, ...bikeTyres];

    res.json(tyres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching tyres' });
  }
};


//-------------------------- show data accroding to search -------------------------

// const Searchcarbike = async (req, res) => {
//   try {
//     const { tyreType, brand, model, tyreBrand, seasons } = req.params;
    
//     console.log("Received parameters:", { tyreType, brand, model, tyreBrand, seasons });

//     let query = { active: true };

//     if (tyreType === "car") {
//         if (brand) query.carbrand = { $in: [brand] }; // Use $in for array fields
//         if (model) query.carModel = { $in: [model] };
//         if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
//         if (seasons) query.seasons = seasons; // Assuming seasons is a string

//         console.log("Query:", query); // Log the constructed query

//         const results = await CarTyre.find(query);
//         return res.status(200).json(results);
//     } else if (tyreType === "bike") {
//         if (brand) query.bikeBrand = { $in: [brand] };
//         if (model) query.bikeModel = { $in: [model] };
//         if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
//         if (seasons) query.seasons = seasons;

//         console.log("Query:", query); // Log the constructed query

//         const results = await BikeTyre.find(query);
//         return res.status(200).json(results);
//     } else {
//         return res.status(400).json({ message: "Invalid tyre type" });
//     }
//   } catch (error) {
//     console.error("Error in search API:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


// const Searchcarbike = async (req, res) => {
//   try {
//     const { tyreType, brand, model, tyreBrand, seasons } = req.params;
    
//     console.log("Received parameters:", { tyreType, brand, model, tyreBrand, seasons });

//     let query = { active: true };

//     if (tyreType === "car") {
//         if (brand) query.carbrand = { $in: [brand] }; // Use $in for array fields
//         if (model) query.carModel = { $in: [model] };
//         if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
//         if (seasons) query.seasons = seasons; // Assuming seasons is a string

//         console.log("Query for car:", query); // Log the constructed query

//         const results = await CarTyre.find(query);
//         return res.status(200).json(results);
//     } else if (tyreType === "bike") {
//         if (brand) query.bikeBrand = { $in: [brand] };
//         if (model) query.bikeModel = { $in: [model] };
//         if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
//         if (seasons) query.seasons = seasons;

//         console.log("Query for bike:", query); // Log the constructed query

//         const results = await BikeTyre.find(query);
//         return res.status(200).json(results);
//     } else if (tyreType === "truck") {
//         if (brand) query.truckBrand = { $in: [brand] };
//         if (model) query.truckModel = { $in: [model] };
//         if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
//         if (seasons) query.seasons = seasons;

//         console.log("Query for truck:", query); // Log the constructed query

//         const results = await TruckTyre.find(query);
//         return res.status(200).json(results);
//     } else {
//         return res.status(400).json({ message: "Invalid tyre type" });
//     }
//   } catch (error) {
//     console.error("Error in search API:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const Searchcarbike = async (req, res) => {
  try {
    const { tyreType, brand, model, tyreBrand, seasons } = req.params;
    
    console.log("Received parameters:", { tyreType, brand, model, tyreBrand, seasons });

    let query = { active: true };

    if (tyreType === "car") {
        if (brand) query.carbrand = { $in: [brand] }; // Use $in for array fields
        if (model) query.carModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons; // Assuming seasons is a string



        console.log("Query for car:", query); // Log the constructed query

        const results = await CarTyre.find(query);
        return res.status(200).json(results);
    } else if (tyreType === "bike") {
        if (brand) query.bikeBrand = { $in: [brand] };
        if (model) query.bikeModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons;

        console.log("Query for bike:", query); // Log the constructed query

        const results = await BikeTyre.find(query);
        return res.status(200).json(results);
    } else if (tyreType === "truck") {
        if (brand) query.truckBrand = { $in: [brand] };
        if (model) query.truckModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons;

        console.log("Query for truck:", query); // Log the constructed query

        const results = await TruckTyre.find(query);
        return res.status(200).json(results);
    } else if (tyreType === "tractor") {
        if (brand) query.tractorBrand = { $in: [brand] };
        if (model) query.tractorModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons;

        console.log("Query for tractor:", query); // Log the constructed query

        const results = await TractorTyre.find(query);
        return res.status(200).json(results);
    } else {
        return res.status(400).json({ message: "Invalid tyre type" });
    }
  } catch (error) {
    console.error("Error in search API:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//------------- Tyre active checkbox productlist ----------------------



// const TyreActive = async (req, res) => {
//   const { id } = req.params;
//   const { active } = req.body;

//   let tyre = await CarTyre.findById(id); // Try finding the tyre in CarTyre collection

//   if (!tyre) {
//     tyre = await BikeTyre.findById(id); // If not found, try finding it in BikeTyre collection
//   }

//   if (!tyre) {
//     tyre = await TruckTyre.findById(id); // If not found, try finding it in TruckTyre collection
//   }

//   if (!tyre) {
//     tyre = await TractorTyre.findById(id); // If not found, try finding it in TractorTyre collection
//   }

//   if (!tyre) {
//     tyre = await Battery.findById(id); // If not found, try finding it in Battery collection
//   }

//   if (!tyre) {
//     tyre = await AlloyWheel.findById(id); // If not found, try finding it in AlloyWheel collection
//   }

//   if (!tyre) {
//     return res.status(404).send({ message: `Tyre, Battery, or Alloy Wheel with ID ${id} not found` });
//   }

//   try {
//     tyre.active = active; // Update the active status
//     await tyre.save(); // Save the updated tyre, battery, or alloy wheel

//     res.send({ message: `Tyre, Battery, or Alloy Wheel with ID ${id} updated successfully`, tyre });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: `Error updating active status of tyre, battery, or alloy wheel with ID ${id}` });
//   }
// };


const TyreActive = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  let tyre = await CarTyre.findById(id); // Try finding the tyre in CarTyre collection

  if (!tyre) {
    tyre = await BikeTyre.findById(id); // If not found, try finding it in BikeTyre collection
  }

  if (!tyre) {
    tyre = await TruckTyre.findById(id); // If not found, try finding it in TruckTyre collection
  }

  if (!tyre) {
    tyre = await TractorTyre.findById(id); // If not found, try finding it in TractorTyre collection
  }

  if (!tyre) {
    tyre = await Battery.findById(id); // If not found, try finding it in Battery collection
  }

  if (!tyre) {
    tyre = await AlloyWheel.findById(id); // If not found, try finding it in AlloyWheel collection
  }

  if (!tyre) {
    tyre = await Accessories.findById(id); // Added check for Accessories collection
  }

  if (!tyre) {
    return res.status(404).send({ message: `Tyre, Battery, Alloy Wheel, or Accessories with ID ${id} not found` });
  }

  try {
    tyre.active = active; // Update the active status
    await tyre.save(); // Save the updated tyre, battery, alloy wheel, or accessories

    res.send({ message: `Tyre, Battery, Alloy Wheel, or Accessories with ID ${id} updated successfully`, tyre });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error updating active status of tyre, battery, alloy wheel, or accessories with ID ${id}` });
  }
};


//------------------------  product details show accroding to slug ------------------

// const ShowDetails = async (req, res) => {
//   try {
//     const { tyreType, slug } = req.params;
    
//     // Decode the slug parameter (to handle encoded characters like %20 for spaces, etc.)
//     const decodedSlug = decodeURIComponent(slug);

//     let TyreModel;
    
//     // Fetch the tyre details based on the slug instead of the id
//     if (tyreType === 'car') {
//       TyreModel = await CarTyre.findOne({ slug: decodedSlug }).exec();
//     } else if (tyreType === 'bike') {
//       TyreModel = await BikeTyre.findOne({ slug: decodedSlug }).exec();
//     } else if (tyreType === 'truck') {
//       TyreModel = await TruckTyre.findOne({ slug: decodedSlug }).exec();
//     } else {
//       return res.status(400).json({ message: "Invalid tyreType. It must be 'car', 'bike', or 'truck'." });
//     }

//     // If no tyre found, return a 404
//     if (!TyreModel) {
//       return res.status(404).json({ message: "Tyre not found" });
//     }

//     // Resolve names for car brands and models
//     if (tyreType === 'car') {
//       const carBrandNames = await CarBrand.find({ _id: { $in: TyreModel.carbrand } });
//       const carModelNames = await CarModel.find({ _id: { $in: TyreModel.carModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       // Map to get an array of names and images for tyre brands
//       const resolvedCarBrands = carBrandNames.map(brand => brand.name);
//       const resolvedCarModels = carModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image  // Include image URL or path
//       }));

//       // Attach resolved names and images to the tyre model
//       const result = {
//         ...TyreModel.toObject(), // Convert to plain object
//         carbrand: resolvedCarBrands,
//         carModel: resolvedCarModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug  // Include slug
//       };

//       // Send the resolved tyre model as the response
//       res.json(result);
//     } else if (tyreType === 'bike') {
//       const bikeBrandNames = await BikeBrand.find({ _id: { $in: TyreModel.bikeBrand } });
//       const bikeModelNames = await BikeModel.find({ _id: { $in: TyreModel.bikeModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       // Map to get an array of names and images for tyre brands
//       const resolvedBikeBrands = bikeBrandNames.map(brand => brand.name);
//       const resolvedBikeModels = bikeModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image  // Include image URL or path
//       }));

//       // Attach resolved names and images to the tyre model
//       const result = {
//         ...TyreModel.toObject(), // Convert to plain object
//         bikeBrand: resolvedBikeBrands,
//         bikeModel: resolvedBikeModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug  // Include slug
//       };

//       // Send the resolved tyre model as the response
//       res.json(result);
//     } else if (tyreType === 'truck') {
//       const truckBrandNames = await TruckBrand.find({ _id: { $in: TyreModel.truckBrand } });
//       const truckModelNames = await TruckModel.find({ _id: { $in: TyreModel.truckModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       // Map to get an array of names and images for tyre brands
//       const resolvedTruckBrands = truckBrandNames.map(brand => brand.name);
//       const resolvedTruckModels = truckModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image  // Include image URL or path
//       }));

//       // Attach resolved names and images to the tyre model
//       const result = {
//         ...TyreModel.toObject(), // Convert to plain object
//         truckBrand: resolvedTruckBrands,
//         truckModel: resolvedTruckModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug  // Include slug
//       };

//       // Send the resolved tyre model as the response
//       res.json(result);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error getting tyres" });
//   }
// };



// const ShowDetails = async (req, res) => {
//   try {
//     const { tyreType, slug } = req.params;
    
//     // Decode the slug parameter (to handle encoded characters like %20 for spaces, etc.)
//     const decodedSlug = decodeURIComponent(slug);

//     let TyreModel;
    
//     // Fetch the tyre details based on the slug instead of the id
//     if (tyreType === 'car') {
//       TyreModel = await CarTyre.findOne({ slug: decodedSlug }).exec();
//     } else if (tyreType === 'bike') {
//       TyreModel = await BikeTyre.findOne({ slug: decodedSlug }).exec();
//     } else if (tyreType === 'truck') {
//       TyreModel = await TruckTyre.findOne({ slug: decodedSlug }).exec();
//     } else if (tyreType === 'tractor') { // Add this block for tractors
//       TyreModel = await TractorTyre.findOne({ slug: decodedSlug }).exec();
//     } else {
//       return res.status(400).json({ message: "Invalid tyreType. It must be 'car', 'bike', 'truck', or 'tractor'." });
//     }

//     // If no tyre found, return a 404
//     if (!TyreModel) {
//       return res.status(404).json({ message: "Tyre not found" });
//     }

//     // Resolve names for car brands and models
//     if (tyreType === 'car') {
//       const carBrandNames = await CarBrand.find({ _id: { $in: TyreModel.carbrand } });
//       const carModelNames = await CarModel.find({ _id: { $in: TyreModel.carModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       const resolvedCarBrands = carBrandNames.map(brand => brand.name);
//       const resolvedCarModels = carModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image
//       }));

//       const result = {
//         ...TyreModel.toObject(),
//         carbrand: resolvedCarBrands,
//         carModel: resolvedCarModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug
//       };

//       res.json(result);
//     } else if (tyreType === 'bike') {
//       const bikeBrandNames = await BikeBrand.find({ _id: { $in: TyreModel.bikeBrand } });
//       const bikeModelNames = await BikeModel.find({ _id: { $in: TyreModel.bikeModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       const resolvedBikeBrands = bikeBrandNames.map(brand => brand.name);
//       const resolvedBikeModels = bikeModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image
//       }));

//       const result = {
//         ...TyreModel.toObject(),
//         bikeBrand: resolvedBikeBrands,
//         bikeModel: resolvedBikeModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug
//       };

//       res.json(result);
//     } else if (tyreType === 'truck') {
//       const truckBrandNames = await TruckBrand.find({ _id: { $in: TyreModel.truckBrand } });
//       const truckModelNames = await TruckModel.find({ _id: { $in: TyreModel.truckModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       const resolvedTruckBrands = truckBrandNames.map(brand => brand.name);
//       const resolvedTruckModels = truckModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image
//       }));

//       const result = {
//         ...TyreModel.toObject(),
//         truckBrand: resolvedTruckBrands,
//         truckModel: resolvedTruckModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug
//       };

//       res.json(result);
//     } else if (tyreType === 'tractor') { // Add this block for tractors
//       const tractorBrandNames = await TractorBrand.find({ _id: { $in: TyreModel.tractorBrand } });
//       const tractorModelNames = await TractorModel.find({ _id: { $in: TyreModel.tractorModel } });
//       const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//       const resolvedTractorBrands = tractorBrandNames.map(brand => brand.name);
//       const resolvedTractorModels = tractorModelNames.map(model => model.name);
//       const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//         name: brand.name,
//         image: brand.image
//       }));

//       const result = {
//         ...TyreModel.toObject(),
//         tractorBrand: resolvedTractorBrands,
//         tractorModel: resolvedTractorModels,
//         tyreBrand: resolvedTyreBrands,
//         slug: decodedSlug
//       };

//       res.json(result);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error getting tyres" });
//   }
// };


const ShowDetails = async (req, res) => {
  try {
    const { tyreType, slug } = req.params;

    // Decode the slug parameter (to handle encoded characters like %20 for spaces, etc.)
    const decodedSlug = decodeURIComponent(slug);

    let TyreModel;

    // Fetch the tyre details based on the slug instead of the id
    if (tyreType === 'car') {
      TyreModel = await CarTyre.findOne({ slug: decodedSlug }).exec();
    } else if (tyreType === 'bike') {
      TyreModel = await BikeTyre.findOne({ slug: decodedSlug }).exec();
    } else if (tyreType === 'truck') {
      TyreModel = await TruckTyre.findOne({ slug: decodedSlug }).exec();
    } else if (tyreType === 'tractor') {
      TyreModel = await TractorTyre.findOne({ slug: decodedSlug }).exec();
    } else if (tyreType === 'battery') { // Add this block for batteries
      TyreModel = await Battery.findOne({ slug: decodedSlug }).exec();
    } else if (tyreType === 'alloywheel') { // Add this block for alloy wheels
      TyreModel = await AlloyWheel.findOne({ slug: decodedSlug }).exec();
    } else if (tyreType === 'accessories') { // Add this block for accessories
      TyreModel = await Accessories.findOne({ slug: decodedSlug }).exec();
    } else {
      return res.status(400).json({ message: "Invalid tyreType. It must be 'car', 'bike', 'truck', 'tractor', 'battery', 'alloywheel', or 'accessories'." });
    }

    // If no tyre found, return a 404
    if (!TyreModel) {
      return res.status(404).json({ message: "Tyre not found" });
    }

    // Resolve names for car brands and models
    if (tyreType === 'car') {
      const carBrandNames = await CarBrand.find({ _id: { $in: TyreModel.carbrand } });
      const carModelNames = await CarModel.find({ _id: { $in: TyreModel.carModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

      const resolvedCarBrands = carBrandNames.map(brand => brand.name);
      const resolvedCarModels = carModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));

      const result = {
        ...TyreModel.toObject(),
        carbrand: resolvedCarBrands,
        carModel: resolvedCarModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug
      };

      res.json(result);
    } else if (tyreType === 'bike') {
      const bikeBrandNames = await BikeBrand.find({ _id: { $in: TyreModel.bikeBrand } });
      const bikeModelNames = await BikeModel.find({ _id: { $in: TyreModel.bikeModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

      const resolvedBikeBrands = bikeBrandNames.map(brand => brand.name);
      const resolvedBikeModels = bikeModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));

      const result = {
        ...TyreModel.toObject(),
        bikeBrand: resolvedBikeBrands,
        bikeModel: resolvedBikeModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug
      };

      res.json(result);
    } else if (tyreType === 'truck') {
      const truckBrandNames = await TruckBrand.find({ _id: { $in: TyreModel.truckBrand } });
      const truckModelNames = await TruckModel.find({ _id: { $in: TyreModel.truckModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

      const resolvedTruckBrands = truckBrandNames.map(brand => brand.name);
      const resolvedTruckModels = truckModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));

      const result = {
        ...TyreModel.toObject(),
        truckBrand: resolvedTruckBrands,
        truckModel: resolvedTruckModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug
      };

      res.json(result);
    } else if (tyreType === 'tractor') {
      const tractorBrandNames = await TractorBrand.find({ _id: { $in: TyreModel.tractorBrand } });
      const tractorModelNames = await TractorModel.find({ _id: { $in: TyreModel.tractorModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

      const resolvedTractorBrands = tractorBrandNames.map(brand => brand.name);
      const resolvedTractorModels = tractorModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));

      const result = {
        ...TyreModel.toObject(),
        tractorBrand: resolvedTractorBrands,
        tractorModel: resolvedTractorModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug
      };

      res.json(result);


    } else if (tyreType === 'battery') {
      const batteryBrandNames = await BatteryBrand.find({ _id: { $in: TyreModel.batteryBrand } });
      const batteryModelNames = await BatteryModel.find({ _id: { $in: TyreModel.batteryModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

      const resolvedBatteryBrands = batteryBrandNames.map(brand => brand.name);
      const resolvedBatteryModels = batteryModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));
    
      const result = {
        ...TyreModel.toObject(),
        batteryBrand: resolvedBatteryBrands,
        batteryModel: resolvedBatteryModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug,
      };
    
      res.json(result);
    
    } else if (tyreType === 'alloywheel') {
      const alloyWheelBrandNames = await AlloyWheelBrand.find({ _id: { $in: TyreModel.alloyWheelBrand } });
      const alloyWheelModelNames = await AlloyWheelModel.find({ _id: { $in: TyreModel.alloyWheelModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });
    
      const resolvedAlloyWheelBrands = alloyWheelBrandNames.map(brand => brand.name);
      const resolvedAlloyWheelModels = alloyWheelModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));
    
      const result = {
        ...TyreModel.toObject(),
        alloyWheelBrand: resolvedAlloyWheelBrands,
        alloyWheelModel: resolvedAlloyWheelModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug
      };
    
      res.json(result);
      
    } else if (tyreType === 'accessories') {
      const accessoryBrandNames = await AccessoriesBrand.find({ _id: { $in: TyreModel.accessoryBrand } });
      const accessoryModelNames = await AccessoriesModel.find({ _id: { $in: TyreModel.accessoryModel } });
      const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });
    
      const resolvedAccessoryBrands = accessoryBrandNames.map(brand => brand.name);
      const resolvedAccessoryModels = accessoryModelNames.map(model => model.name);
      const resolvedTyreBrands = tyreBrandNames.map(brand => ({
        name: brand.name,
        image: brand.image
      }));
    
      const result = {
        ...TyreModel.toObject(),
        accessoryBrand: resolvedAccessoryBrands,
        accessoryModel: resolvedAccessoryModels,
        tyreBrand: resolvedTyreBrands,
        slug: decodedSlug
      };
    
      res.json(result);
    }    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting details" });
  }
};


//----------------------------- dealer categories checkbox api ----------------


// const GetCheckbox = async (req, res) => {
//   const { selectedBrands, tyreTypes } = req.query;

//   const filters = {};
//   const brandsArray = selectedBrands ? JSON.parse(selectedBrands) : {};

//   try {
//     // Fetch tyres and other products based on type and brand selection
//     let carTyres = [];
//     let bikeTyres = [];
//     let truckTyres = [];
//     let tractorTyres = [];
//     let batteries = [];
//     let alloyWheels = [];

//     if (tyreTypes && JSON.parse(tyreTypes).car) {
//       carTyres = await CarTyre.find({
//         tyreType: 'car',
//         tyreBrand: { $in: brandsArray.car || [] }
//       });
//     }

//     if (tyreTypes && JSON.parse(tyreTypes).bike) {
//       bikeTyres = await BikeTyre.find({
//         tyreType: 'bike',
//         tyreBrand: { $in: brandsArray.bike || [] }
//       });
//     }

//     if (tyreTypes && JSON.parse(tyreTypes).truck) {
//       truckTyres = await TruckTyre.find({
//         tyreType: 'truck',
//         tyreBrand: { $in: brandsArray.truck || [] }
//       });
//     }

//     if (tyreTypes && JSON.parse(tyreTypes).tractor) {
//       tractorTyres = await TractorTyre.find({
//         tyreType: 'tractor',
//         tyreBrand: { $in: brandsArray.tractor || [] }
//       });
//     }

//     if (tyreTypes && JSON.parse(tyreTypes).battery) {
//       batteries = await Battery.find({
//         tyreType: 'battery', // Assuming you use 'tyreType' field also for battery
//         tyreBrand: { $in: brandsArray.battery || [] }
//       });
//     }

//     if (tyreTypes && JSON.parse(tyreTypes).alloywheel) {
//       alloyWheels = await AlloyWheel.find({
//         tyreType: 'alloywheel', // Assuming you use 'tyreType' field also for alloy wheels
//         tyreBrand: { $in: brandsArray.alloywheel || [] }
//       });
//     }

//     // Combine all products
//     const filteredProducts = [
//       ...carTyres,
//       ...bikeTyres,
//       ...truckTyres,
//       ...tractorTyres,
//       ...batteries,
//       ...alloyWheels,
//     ];

//     res.json(filteredProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// };


const GetCheckbox = async (req, res) => {
  const { selectedBrands, tyreTypes } = req.query;

  const brandsArray = selectedBrands ? JSON.parse(selectedBrands) : {};
  const typeFilters = tyreTypes ? JSON.parse(tyreTypes) : {};

  try {
    let carTyres = [];
    let bikeTyres = [];
    let truckTyres = [];
    let tractorTyres = [];
    let batteries = [];
    let alloyWheels = [];
    let accessories = [];

    if (typeFilters.car) {
      carTyres = await CarTyre.find({
        tyreType: 'car',
        tyreBrand: { $in: brandsArray.car || [] }
      });
    }

    if (typeFilters.bike) {
      bikeTyres = await BikeTyre.find({
        tyreType: 'bike',
        tyreBrand: { $in: brandsArray.bike || [] }
      });
    }

    if (typeFilters.truck) {
      truckTyres = await TruckTyre.find({
        tyreType: 'truck',
        tyreBrand: { $in: brandsArray.truck || [] }
      });
    }

    if (typeFilters.tractor) {
      tractorTyres = await TractorTyre.find({
        tyreType: 'tractor',
        tyreBrand: { $in: brandsArray.tractor || [] }
      });
    }

    if (typeFilters.battery) {
      batteries = await Battery.find({
        tyreType: 'battery',
        tyreBrand: { $in: brandsArray.battery || [] }
      });
    }

    if (typeFilters.alloywheel) {
      alloyWheels = await AlloyWheel.find({
        tyreType: 'alloywheel',
        tyreBrand: { $in: brandsArray.alloywheel || [] }
      });
    }

    if (typeFilters.accessories) {
      accessories = await Accessories.find({
        tyreType: 'accessories',
        tyreBrand: { $in: brandsArray.accessories || [] }
      });
    }

    const filteredProducts = [
      ...carTyres,
      ...bikeTyres,
      ...truckTyres,
      ...tractorTyres,
      ...batteries,
      ...alloyWheels,
      ...accessories,
    ];

    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



//---------------------------- best deal api ------------------

// const bestdeal = async (req, res) => {
//   try {
//     // Fetch all active car and bike tyres
//     const carTyres = await CarTyre.find({ active: true });
//     const bikeTyres = await BikeTyre.find({ active: true });

//     // Function to calculate discount percentage
//     const calculateDiscount = (price, salesPrice) => {
//       return ((price - salesPrice) / price) * 100;

//     };

//     // Filter best deals (10% or 20% discount)
//     const bestCarDeals = carTyres.filter(tyre => {
//       if (tyre.price > 0 && tyre.Salesprice > 0) {
//         const discount = calculateDiscount(tyre.price, tyre.Salesprice);
//         return discount >= 10; // Only include 10%+ discount
//       }
//       return false;
//     });

//     const bestBikeDeals = bikeTyres.filter(tyre => {
//       if (tyre.price > 0 && tyre.Salesprice > 0) {
//         const discount = calculateDiscount(tyre.price, tyre.Salesprice);
//         return discount >= 10;
//       }
//       return false;
//     });

//     res.json({
//       success: true,
//       carDeals: bestCarDeals,
//       bikeDeals: bestBikeDeals
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server Error', error });
//   }
// };

// const bestdeal = async (req, res) => {
//   try {
//     // Fetch all active car, bike, truck, and tractor tyres
//     const carTyres = await CarTyre.find({ active: true });
//     const bikeTyres = await BikeTyre.find({ active: true });
//     const truckTyres = await TruckTyre.find({ active: true }); // Fetch active truck tyres
//     const tractorTyres = await TractorTyre.find({ active: true }); // Fetch active tractor tyres

//     // Function to calculate discount percentage
//     const calculateDiscount = (price, salesPrice) => {
//       return ((price - salesPrice) / price) * 100;
//     };

//     // Filter best deals (10% or more discount)
//     const bestCarDeals = carTyres.filter(tyre => {
//       if (tyre.price > 0 && tyre.Salesprice > 0) {
//         const discount = calculateDiscount(tyre.price, tyre.Salesprice);
//         return discount >= 10; // Only include 10%+ discount
//       }
//       return false;
//     });

//     const bestBikeDeals = bikeTyres.filter(tyre => {
//       if (tyre.price > 0 && tyre.Salesprice > 0) {
//         const discount = calculateDiscount(tyre.price, tyre.Salesprice);
//         return discount >= 10;
//       }
//       return false;
//     });

//     const bestTruckDeals = truckTyres.filter(tyre => {
//       if (tyre.price > 0 && tyre.Salesprice > 0) {
//         const discount = calculateDiscount(tyre.price, tyre.Salesprice);
//         return discount >= 10;
//       }
//       return false;
//     });

//     const bestTractorDeals = tractorTyres.filter(tyre => {
//       if (tyre.price > 0 && tyre.Salesprice > 0) {
//         const discount = calculateDiscount(tyre.price, tyre.Salesprice);
//         return discount >= 10;
//       }
//       return false;
//     });

//     res.json({
//       success: true,
//       carDeals: bestCarDeals,
//       bikeDeals: bestBikeDeals,
//       truckDeals: bestTruckDeals, // Include truck deals in the response
//       tractorDeals: bestTractorDeals // Include tractor deals in the response
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server Error', error });
//   }
// };


const bestdeal = async (req, res) => {
  try {
    // Fetch all active car, bike, truck, tractor tyres, batteries, alloy wheels, and accessories
    const carTyres = await CarTyre.find({ active: true });
    const bikeTyres = await BikeTyre.find({ active: true });
    const truckTyres = await TruckTyre.find({ active: true });
    const tractorTyres = await TractorTyre.find({ active: true });
    const batteries = await Battery.find({ active: true }); // Fetch active batteries
    const alloyWheels = await AlloyWheel.find({ active: true }); // Fetch active alloy wheels
    const accessories = await Accessories.find({ active: true }); // Fetch active accessories

    // Function to calculate discount percentage
    const calculateDiscount = (price, salesPrice) => {
      return ((price - salesPrice) / price) * 100;
    };

    // Filter best deals (10% or more discount)
    const filterBestDeals = (items) => {
      return items.filter(item => {
        if (item.price > 0 && item.Salesprice > 0) {
          const discount = calculateDiscount(item.price, item.Salesprice);
          return discount >= 10; // Only include 10%+ discount
        }
        return false;
      });
    };

    const bestCarDeals = filterBestDeals(carTyres);
    const bestBikeDeals = filterBestDeals(bikeTyres);
    const bestTruckDeals = filterBestDeals(truckTyres);
    const bestTractorDeals = filterBestDeals(tractorTyres);
    const bestBatteryDeals = filterBestDeals(batteries); // Filter best battery deals
    const bestAlloyWheelDeals = filterBestDeals(alloyWheels); // Filter best alloy wheel deals
    const bestAccessoryDeals = filterBestDeals(accessories); // Filter best accessory deals

    res.json({
      success: true,
      carDeals: bestCarDeals,
      bikeDeals: bestBikeDeals,
      truckDeals: bestTruckDeals,
      tractorDeals: bestTractorDeals,
      batteryDeals: bestBatteryDeals, // Include battery deals in the response
      alloyWheelDeals: bestAlloyWheelDeals, // Include alloy wheel deals in the response
      accessoryDeals: bestAccessoryDeals // Include accessory deals in the response
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


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
    bestdeal,
    Searchcarbike
}