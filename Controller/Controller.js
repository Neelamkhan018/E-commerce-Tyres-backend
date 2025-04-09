
import  {BikeTyre, CarTyre, TractorTyre, TruckTyre } from "../Models/adminModel.js";
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
//         bikeBrand, bikeModel, tyreBrand,  width, height, customs,
//         seasons, speedRating, loadCapacity, price, Salesprice, description,
//         description1, warranty, city, state, manufactureMonth, manufactureYear,
//         fronttyre, reartyre, material
//       } = req.body;

//       console.log("Request Body:", req.body);
//       console.log("Uploaded Files:", req.files);

//       // Parse the addresses if needed
//       let addresses = [];
//       try {
//         addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
//         console.log("Parsed Addresses:", addresses);
//       } catch (e) {
//         console.error("Error parsing addresses:", e);
//         return res.status(400).send({ message: "Invalid addresses format" });
//       }

//       // Collect the uploaded images' filenames
//       const avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : null;
//       const thumb1Images = req.files['thumb1'] ? req.files['thumb1'][0].filename : null;
//       const thumb2Images = req.files['thumb2'] ? req.files['thumb2'][0].filename : null;
//       const thumb3Images = req.files['thumb3'] ? req.files['thumb3'][0].filename : null;
//       const thumb4Images = req.files['thumb4'] ? req.files['thumb4'][0].filename : null;
//       const thumb5Images = req.files['thumb5'] ? req.files['thumb5'][0].filename : null;
//       const thumb6Images = req.files['thumb6'] ? req.files['thumb6'][0].filename : null;

//       try {
//         // If tyreType is 'car', save a car tyre
//         if (tyreType === 'car') {
//           const carTyre = new CarTyre({
//             title,
//             slug,  // Save slug separately
//             tyreType,
//             carbrand,
//             carModel,
//             tyreBrand,
//             width,
//             addresses,
//             height,
//             customs,
//             seasons,
//             speedRating,
//             loadCapacity,
//             material,
//             manufactureMonth,
//             manufactureYear,
//             avatarImages,  // Store avatar image
//             thumb1Images,  // Store thumbnail images
//             thumb2Images,
//             thumb3Images,
//             thumb4Images,
//             thumb5Images,
//             thumb6Images,
//             price,
//             Salesprice,
//             description,
//             description1,
//             warranty,
//             city,
//             state,
//             pinCode,
//             details
//           });
         
//           await carTyre.save();
//           res.send({ message: "Car tyre added successfully" });

//         // If tyreType is 'bike', save a bike tyre
//         } else if (tyreType === 'bike') {
//           const bikeTyre = new BikeTyre({
//             title,
//             slug,  // Save slug separately
//             tyreType,
//             bikeBrand,
//             bikeModel,
//             tyreBrand, 
//             width,
//             addresses,
//             height,
//             customs,
//             seasons,
//             fronttyre,
//             reartyre,
//             speedRating,
//             loadCapacity,
//             material,
//             avatarImages,  // Store avatar image
//             thumb1Images,  // Store thumbnail images
//             thumb2Images,
//             thumb3Images,
//             thumb4Images,
//             thumb5Images,
//             thumb6Images,
//             manufactureMonth,
//             manufactureYear,
//             price,
//             Salesprice,
//             description,
//             description1,
//             warranty,
//             city,
//             state,
//             pinCode,
//             details
//           });

//           await bikeTyre.save();
//           res.send({ message: "Bike tyre added successfully" });

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


//added tractor
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
        seasons, speedRating, loadCapacity, price, Salesprice, description,
        description1, warranty, city, state, manufactureMonth, manufactureYear,
        fronttyre, reartyre, material, tractorBrand, tractorModel
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

      const avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : null;
      const thumbImages = Array.from({ length: 6 }, (_, i) => req.files[`thumb${i + 1}`]?.[0]?.filename || null);

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

// added truck
// const showProductFunction = async (req, res) => {
//   try {
//     // Fetch all car tyres, bike tyres, and truck tyres asynchronously
//     const [carTyres, bikeTyres, truckTyres] = await Promise.all([
//       CarTyre.find().exec(),
//       BikeTyre.find().exec(),
//       TruckTyre.find().exec(), // Fetch truck tyres
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
//       return value && typeof value === 'string' ? value.split(",") : [];
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
//         const truckBrandIds = safeSplit(tyre.truckBrand && tyre.truckBrand[0]); // Ensure lowercase
//         const truckModelIds = safeSplit(tyre.truckModel && tyre.truckModel[0]);
//         const tyreBrandIds = safeSplit(tyre.tyreBrand && tyre.tyreBrand[0]);
    
//         const truckBrandNames = await getNamesByIds(truckBrandIds, TruckBrand);
//         const truckModelNames = await getNamesByIds(truckModelIds, TruckModel);
//         const tyreBrandNames = await getNamesByIds(tyreBrandIds, TyreBrand);
    
//         return {
//           ...tyre.toObject(),
//           truckBrand: truckBrandNames, // Ensure consistency
//           truckModel: truckModelNames,
//           tyreBrand: tyreBrandNames,
//         };
//       })
//     );

//     // Combine updated car, bike, and truck tyres
//     const tyres = [...updatedCarTyres, ...updatedBikeTyres, ...updatedTruckTyres];

//     // Send response with the combined tyre data
//     res.send(tyres);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error getting tyres" });
//   }
// };


const showProductFunction = async (req, res) => {
  try {
    // Fetch all car tyres, bike tyres, truck tyres, and tractor tyres asynchronously
    const [carTyres, bikeTyres, truckTyres, tractorTyres] = await Promise.all([
      CarTyre.find().exec(),
      BikeTyre.find().exec(),
      TruckTyre.find().exec(),
      TractorTyre.find().exec(), // Fetch tractor tyres
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
      return value && typeof value === 'string' ? value.split(",") : [];
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

    // Combine updated car, bike, truck, and tractor tyres
    const tyres = [
      ...updatedCarTyres,
      ...updatedBikeTyres,
      ...updatedTruckTyres,
      ...updatedTractorTyres, // Include tractor tyres
    ];

    // Send response with the combined tyre data
    res.send(tyres);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting tyres" });
  }
};


 
// --------------------- update show form  previous data ------------------------------

//edit data show
// const showFunction = async (req, res) => {
//   try {
//     const { id, tyreType } = req.params;

//     let tyreData;
//     if (tyreType === 'car') {
//       tyreData = await CarTyre.findById(id);
//     } else if (tyreType === 'bike') {
//       tyreData = await BikeTyre.findById(id);
//     }

//     if (!tyreData) {
//       return res.status(404).json({ message: 'Tyre not found' });
//     }

//     // Convert all IDs to names
//     const convertedData = await convertIdsToNames(tyreType, tyreData._doc);
    
//     res.json(convertedData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Helper function to convert IDs to names
// async function convertIdsToNames(tyreType, data) {
//   // Common conversion for tyreBrand
//   const tyreBrandNames = await Promise.all(
//     data.tyreBrand.map(async (id) => {
//       const brand = await TyreBrand.findById(id);
//       return brand ? brand.name : id; // Return ID if brand not found
//     })
//   );

//   if (tyreType === 'car') {
//     const [carBrands, carModels] = await Promise.all([
//       Promise.all(data.carbrand.map(async (id) => {
//         const brand = await CarBrand.findById(id);
//         return brand ? brand.name : id;
//       })),
//       Promise.all(data.carModel.map(async (id) => {
//         const model = await CarModel.findById(id);
//         return model ? model.name : id;
//       }))
//     ]);

//     return {
//       ...data,
//       carbrand: carBrands,
//       carModel: carModels,
//       tyreBrand: tyreBrandNames
//     };
//   }

//   if (tyreType === 'bike') {
//     const [bikeBrands, bikeModels] = await Promise.all([
//       Promise.all(data.bikeBrand.map(async (id) => {
//         const brand = await BikeBrand.findById(id);
//         return brand ? brand.name : id;
//       })),
//       Promise.all(data.bikeModel.map(async (id) => {
//         const model = await BikeModel.findById(id);
//         return model ? model.name : id;
//       }))
//     ]);

//     return {
//       ...data,
//       bikeBrand: bikeBrands,
//       bikeModel: bikeModels,
//       tyreBrand: tyreBrandNames
//     };
//   }

//   return data;
// }


// const showFunction = async (req, res) => {
//   try {
//     const { id, tyreType } = req.params;

//     let tyreData;
//     if (tyreType === 'car') {
//       tyreData = await CarTyre.findById(id);
//     } else if (tyreType === 'bike') {
//       tyreData = await BikeTyre.findById(id);
//     } else if (tyreType === 'truck') { // New condition for trucks
//       tyreData = await TruckTyre.findById(id);
//     }

//     if (!tyreData) {
//       return res.status(404).json({ message: 'Tyre not found' });
//     }

//     // Convert all IDs to names
//     const convertedData = await convertIdsToNames(tyreType, tyreData._doc);
    
//     res.json(convertedData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// async function convertIdsToNames(tyreType, data) {
//   // Common conversion for tyreBrand
//   const tyreBrandNames = await Promise.all(
//     data.tyreBrand.map(async (id) => {
//       const brand = await TyreBrand.findById(id);
//       return brand ? brand.name : id; // Return ID if brand not found
//     })
//   );

//   if (tyreType === 'car') {
//     const [carBrands, carModels] = await Promise.all([
//       Promise.all(data.carbrand.map(async (id) => {
//         const brand = await CarBrand.findById(id);
//         return brand ? brand.name : id;
//       })),
//       Promise.all(data.carModel.map(async (id) => {
//         const model = await CarModel.findById(id);
//         return model ? model.name : id;
//       }))
//     ]);

//     return {
//       ...data,
//       carbrand: carBrands,
//       carModel: carModels,
//       tyreBrand: tyreBrandNames
//     };
//   }

//   if (tyreType === 'bike') {
//     const [bikeBrands, bikeModels] = await Promise.all([
//       Promise.all(data.bikeBrand.map(async (id) => {
//         const brand = await BikeBrand.findById(id);
//         return brand ? brand.name : id;
//       })),
//       Promise.all(data.bikeModel.map(async (id) => {
//         const model = await BikeModel.findById(id);
//         return model ? model.name : id;
//       }))
//     ]);

//     return {
//       ...data,
//       bikeBrand: bikeBrands,
//       bikeModel: bikeModels,
//       tyreBrand: tyreBrandNames
//     };
//   }

//   if (tyreType === 'truck') { // New condition for trucks
//     const [truckBrands, truckModels] = await Promise.all([
//       Promise.all(data.truckBrand.map(async (id) => {
//         const brand = await TruckBrand.findById(id);
//         return brand ? brand.name : id;
//       })),
//       Promise.all(data.truckModel.map(async (id) => {
//         const model = await TruckModel.findById(id);
//         return model ? model.name : id;
//       }))
//     ]);

//     return {
//       ...data,
//       truckBrand: truckBrands,
//       truckModel: truckModels,
//       tyreBrand: tyreBrandNames
//     };
//   }

//   return data;
// }

const showFunction = async (req, res) => {
  try {
    const { id, tyreType } = req.params;

    let tyreData;
    if (tyreType === 'car') {
      tyreData = await CarTyre.findById(id);
    } else if (tyreType === 'bike') {
      tyreData = await BikeTyre.findById(id);
    } else if (tyreType === 'truck') {
      tyreData = await TruckTyre.findById(id);
    } else if (tyreType === 'tractor') { // ✅ New condition for tractor
      tyreData = await TractorTyre.findById(id);
    }

    if (!tyreData) {
      return res.status(404).json({ message: 'Tyre not found' });
    }

    const convertedData = await convertIdsToNames(tyreType, tyreData._doc);
    
    res.json(convertedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


async function convertIdsToNames(tyreType, data) {
  const tyreBrandNames = await Promise.all(
    data.tyreBrand.map(async (id) => {
      const brand = await TyreBrand.findById(id);
      return brand ? brand.name : id;
    })
  );

  if (tyreType === 'car') {
    const [carBrands, carModels] = await Promise.all([
      Promise.all(data.carbrand.map(async (id) => {
        const brand = await CarBrand.findById(id);
        return brand ? brand.name : id;
      })),
      Promise.all(data.carModel.map(async (id) => {
        const model = await CarModel.findById(id);
        return model ? model.name : id;
      }))
    ]);

    return {
      ...data,
      carbrand: carBrands,
      carModel: carModels,
      tyreBrand: tyreBrandNames
    };
  }

  if (tyreType === 'bike') {
    const [bikeBrands, bikeModels] = await Promise.all([
      Promise.all(data.bikeBrand.map(async (id) => {
        const brand = await BikeBrand.findById(id);
        return brand ? brand.name : id;
      })),
      Promise.all(data.bikeModel.map(async (id) => {
        const model = await BikeModel.findById(id);
        return model ? model.name : id;
      }))
    ]);

    return {
      ...data,
      bikeBrand: bikeBrands,
      bikeModel: bikeModels,
      tyreBrand: tyreBrandNames
    };
  }

  if (tyreType === 'truck') {
    const [truckBrands, truckModels] = await Promise.all([
      Promise.all(data.truckBrand.map(async (id) => {
        const brand = await TruckBrand.findById(id);
        return brand ? brand.name : id;
      })),
      Promise.all(data.truckModel.map(async (id) => {
        const model = await TruckModel.findById(id);
        return model ? model.name : id;
      }))
    ]);

    return {
      ...data,
      truckBrand: truckBrands,
      truckModel: truckModels,
      tyreBrand: tyreBrandNames
    };
  }

  if (tyreType === 'tractor') { // ✅ New condition for tractor
    const [tractorBrands, tractorModels] = await Promise.all([
      Promise.all(data.tractorBrand.map(async (id) => {
        const brand = await TractorBrand.findById(id);
        return brand ? brand.name : id;
      })),
      Promise.all(data.tractorModel.map(async (id) => {
        const model = await TractorModel.findById(id);
        return model ? model.name : id;
      }))
    ]);

    return {
      ...data,
      tractorBrand: tractorBrands,
      tractorModel: tractorModels,
      tyreBrand: tyreBrandNames
    };
  }

  return data;
}


// //   // --------------UPDATE FUNCTION ----------------------



// const updateFunction = async (req, res) => {
//   // Ensure multer handles file upload before processing request
//   upload(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer error:", err);
//       return res.status(500).send({ message: "Multer error: " + err.message });
//     } else if (err) {
//       console.error("Unknown error:", err);
//       return res.status(500).send({ message: "Unknown error: " + err.message });
//     }

//     // Check if body and files are available
//     if (!req.body || !req.files) {
//       return res.status(400).send({ message: "No data or files uploaded" });
//     }
//     console.log(req.body);
//     console.log(req.files);

//     const { id } = req.params;
//     const {
//       title, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
//       bikeBrand, bikeModel, tyreBrand, tyreModel, width, height, customs,
//       seasons, speedRating, loadCapacity, price, Salesprice, description,
//       description1, warranty, city, state, manufactureMonth, manufactureYear,
//       fronttyre, reartyre,  quantity, material, avatarImages, thumb1Images, thumb2Images, thumb3Images, thumb4Images, thumb5Images, thumb6Images,
//       slug // Add the slug field
//     } = req.body;

//     let TyreModel;

//     // Determine tyre model (car or bike)
//     switch (tyreType) {
//       case 'car':
//         TyreModel = CarTyre;
//         break;
//       case 'bike':
//         TyreModel = BikeTyre;
//         break;
//       default:
//         return res.status(400).send({ message: 'Invalid tyre type' });
//     }

//     // Parse addresses if needed
//     let addresses = [];
//     try {
//       addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
//       console.log("Parsed Addresses:", addresses);
//     } catch (e) {
//       console.error("Error parsing addresses:", e);
//       return res.status(400).send({ message: "Invalid addresses format" });
//     }

//     try {
//       // Find the existing tyre
//       const existingTyre = await TyreModel.findById(id);
//       if (!existingTyre) {
//         return res.status(404).send({ message: `Tyre with ID ${id} not found `});
//       }

//       // Initialize image variables with existing values
//       let avatarImages = existingTyre.avatarImages || '';
//       let thumb1Images = existingTyre.thumb1Images || '';
//       let thumb2Images = existingTyre.thumb2Images || '';
//       let thumb3Images = existingTyre.thumb3Images || '';
//       let thumb4Images = existingTyre.thumb4Images || '';
//       let thumb5Images = existingTyre.thumb5Images || '';
//       let thumb6Images = existingTyre.thumb6Images || '';

//       // Handle image uploads
//       if (req.files) {
//         avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : avatarImages;
//         thumb1Images = req.files['thumb1'] ? req.files['thumb1'][0].filename : thumb1Images;
//         thumb2Images = req.files['thumb2'] ? req.files['thumb2'][0].filename : thumb2Images;
//         thumb3Images = req.files['thumb3'] ? req.files['thumb3'][0].filename : thumb3Images;
//         thumb4Images = req.files['thumb4'] ? req.files['thumb4'][0].filename : thumb4Images;
//         thumb5Images = req.files['thumb5'] ? req.files['thumb5'][0].filename : thumb5Images;
//         thumb6Images = req.files['thumb6'] ? req.files['thumb6'][0].filename : thumb6Images;
//       }

//       // If slug is provided, use it; otherwise, generate a default slug from the title
//       const newSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

//       // Update the tyre
//       const updatedTyre = await TyreModel.findByIdAndUpdate(
//         id,
//         {
//           title,
//           carbrand,
//           carModel,
//           tyreType,
//           bikeBrand,
//           bikeModel,
//           tyreBrand,
//           tyreModel,
//           width,
//           addresses,
//           height,
//           customs,
//           seasons,
//           fronttyre,
//           reartyre,
//           speedRating,
//           loadCapacity,
//           material,
//           avatarImages,
//           thumb1Images,
//           thumb2Images,
//           thumb3Images,
//           thumb4Images,
//           thumb5Images,
//           thumb6Images,
//           manufactureMonth,
//           manufactureYear,
//           price,
//           Salesprice,
//           description,
//           description1,
//           warranty,
//           quantity,
//           city,
//           state,
//           pinCode,
//           details,
//           slug: newSlug // Add slug field to the update
//         },
//         { new: true } // Return the updated document
//       );

//       if (updatedTyre) {
//         res.send({ message: `${tyreType.charAt(0).toUpperCase()}${tyreType.slice(1)} tyre with ID ${id} updated successfully`, updatedTyre });
//       } else {
//         res.status(404).send({ message: `Tyre with ID ${id} not found `});
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send({ message: `Error updating ${tyreType} tyre `});
//     }
//   });
// };


// const updateFunction = async (req, res) => {
//   // Ensure multer handles file upload before processing request
//   upload(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer error:", err);
//       return res.status(500).send({ message: "Multer error: " + err.message });
//     } else if (err) {
//       console.error("Unknown error:", err);
//       return res.status(500).send({ message: "Unknown error: " + err.message });
//     }

//     // Check if body and files are available
//     if (!req.body || !req.files) {
//       return res.status(400).send({ message: "No data or files uploaded" });
//     }
//     console.log(req.body);
//     console.log(req.files);

//     const { id } = req.params;
//     const {
//       title, tyreType, carbrand, addresses: rawAddresses, pinCode, details, carModel,
//       bikeBrand, bikeModel, tyreBrand, tyreModel, width, height, customs,
//       seasons, speedRating, loadCapacity, price, Salesprice, description,
//       description1, warranty, city, state, manufactureMonth, manufactureYear,
//       fronttyre, reartyre, quantity, material, avatarImages, thumb1Images, thumb2Images, thumb3Images, thumb4Images, thumb5Images, thumb6Images,
//       slug // Add the slug field
//     } = req.body;

//     let TyreModel;

//     // Determine tyre model (car, bike, or truck)
//     switch (tyreType) {
//       case 'car':
//         TyreModel = CarTyre;
//         break;
//       case 'bike':
//         TyreModel = BikeTyre;
//         break;
//       case 'truck':
//         TyreModel = TruckTyre; // Assuming TruckTyre is defined elsewhere
//         break;
//       default:
//         return res.status(400).send({ message: 'Invalid tyre type' });
//     }

//     // Parse addresses if needed
//     let addresses = [];
//     try {
//       addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
//       console.log("Parsed Addresses:", addresses);
//     } catch (e) {
//       console.error("Error parsing addresses:", e);
//       return res.status(400).send({ message: "Invalid addresses format" });
//     }

//     try {
//       // Find the existing tyre
//       const existingTyre = await TyreModel.findById(id);
//       if (!existingTyre) {
//         return res.status(404).send({ message: `Tyre with ID ${id} not found `});
//       }

//       // Initialize image variables with existing values
//       let avatarImages = existingTyre.avatarImages || '';
//       let thumb1Images = existingTyre.thumb1Images || '';
//       let thumb2Images = existingTyre.thumb2Images || '';
//       let thumb3Images = existingTyre.thumb3Images || '';
//       let thumb4Images = existingTyre.thumb4Images || '';
//       let thumb5Images = existingTyre.thumb5Images || '';
//       let thumb6Images = existingTyre.thumb6Images || '';

//       // Handle image uploads
//       if (req.files) {
//         avatarImages = req.files['avatar'] ? req.files['avatar'][0].filename : avatarImages;
//         thumb1Images = req.files['thumb1'] ? req.files['thumb1'][0].filename : thumb1Images;
//         thumb2Images = req.files['thumb2'] ? req.files['thumb2'][0].filename : thumb2Images;
//         thumb3Images = req.files['thumb3'] ? req.files['thumb3'][0].filename : thumb3Images;
//         thumb4Images = req.files['thumb4'] ? req.files['thumb4'][0].filename : thumb4Images;
//         thumb5Images = req.files['thumb5'] ? req.files['thumb5'][0].filename : thumb5Images;
//         thumb6Images = req.files['thumb6'] ? req.files['thumb6'][0].filename : thumb6Images;
//       }

//       // If slug is provided, use it; otherwise, generate a default slug from the title
//       const newSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

//       // Update the tyre
//       const updatedTyre = await TyreModel.findByIdAndUpdate(
//         id,
//         {
//           title,
//           carbrand,
//           carModel,
//           tyreType,
//           bikeBrand,
//           bikeModel,
//           tyreBrand,
//           tyreModel,
//           width,
//           addresses,
//           height,
//           customs,
//           seasons,
//           fronttyre,
//           reartyre,
//           speedRating,
//           loadCapacity,
//           material,
//           avatarImages,
//           thumb1Images,
//           thumb2Images,
//           thumb3Images,
//           thumb4Images,
//           thumb5Images,
//           thumb6Images,
//           manufactureMonth,
//           manufactureYear,
//           price,
//           Salesprice,
//           description,
//           description1,
//           warranty,
//           quantity,
//           city,
//           state,
//           pinCode,
//           details,
//           slug: newSlug // Add slug field to the update
//         },
//         { new: true } // Return the updated document
//       );

//       if (updatedTyre) {
//         res.send({ message: `${tyreType.charAt(0).toUpperCase()}${tyreType.slice(1)} tyre with ID ${id} updated successfully`, updatedTyre });
//       } else {
//         res.status(404).send({ message: `Tyre with ID ${id} not found `});
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send({ message: `Error updating ${tyreType} tyre `});
//     }
//   });
// };


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
      fronttyre, reartyre, quantity, material, avatarImages, thumb1Images, thumb2Images, thumb3Images, thumb4Images, thumb5Images, thumb6Images,
      slug // Add the slug field
    } = req.body;

    let TyreModel;

    // Determine tyre model (car, bike, truck, or tractor)
    switch (tyreType) {
      case 'car':
        TyreModel = CarTyre;
        break;
      case 'bike':
        TyreModel = BikeTyre;
        break;
      case 'truck':
        TyreModel = TruckTyre; // Assuming TruckTyre is defined elsewhere
        break;
      case 'tractor':
        TyreModel = TractorTyre; // Add this line for tractor
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

      // If slug is provided, use it; otherwise, generate a default slug from the title
      const newSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

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
          slug: newSlug // Add slug field to the update
        },
        { new: true } // Return the updated document
      );

      if (updatedTyre) {
        res.send({ message: `${tyreType.charAt(0).toUpperCase()}${tyreType.slice(1)} tyre with ID ${id} updated successfully`, updatedTyre });
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

// const deleteFunction = async (req,res)=>{
//   const id = req.params.id;
//   const type = req.params.type;

//   let TyreModel;

//   switch (type) {
    
    
//     case 'car':
//       TyreModel = CarTyre;
//       break;
//     case 'bike':
//       TyreModel = BikeTyre;
//       break;
//     default:
//       return res.status(400).send({ message: 'Invalid tyre type' });
//   }

//   try {
//     const deletedTyre = await TyreModel.deleteOne({ _id: id });
//     if (deletedTyre.deletedCount === 1) {
//       res.send({ message: `${type.charAt(0).toUpperCase()}${type.slice(1)} tyre with ID ${id} deleted` });
//     } else {
//       res.status(404).send({ message: `Tyre with ID ${id} not found` });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: `Error deleting ${type} tyre` });
//   }
// }


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
    case 'truck':  // Added truck tyre support
      TyreModel = TruckTyre;
      break;
    case 'tractor': // Added tractor tyre support
      TyreModel = TractorTyre;
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

// const TyreActive = async (req,res)=>{

//   const { id } = req.params;
//   const { active } = req.body;

//   let tyre = await CarTyre.findById(id); // Try finding the tyre in CarTyre collection

//   if (!tyre) {
//     tyre = await BikeTyre.findById(id); // If not found, try finding it in BikeTyre collection
//   }

//   if (!tyre) {
//     return res.status(404).send({ message: `Tyre with ID ${id} not found `});
//   }

//   try {
//     tyre.active = active; // Update the active status
//     await tyre.save(); // Save the updated tyre

//     res.send({ message: `Tyre with ID ${id} updated successfully, tyre `});
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: `Error updating active status of tyre with ID ${id}` });
//   }

// }

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
    return res.status(404).send({ message: `Tyre with ID ${id} not found` });
  }

  try {
    tyre.active = active; // Update the active status
    await tyre.save(); // Save the updated tyre

    res.send({ message: `Tyre with ID ${id} updated successfully`, tyre });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error updating active status of tyre with ID ${id}` });
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
//     } else {
//       return res.status(400).json({ message: "Invalid tyreType. It must be 'car' or 'bike'." });
//     }

//     // If no tyre found, return a 404
//     if (!TyreModel) {
//       return res.status(404).json({ message: "Tyre not found" });
//     }

//     // Resolve names for car brands and models
//     const carBrandNames = await CarBrand.find({ _id: { $in: TyreModel.carbrand } });
//     const carModelNames = await CarModel.find({ _id: { $in: TyreModel.carModel } });
//     const tyreBrandNames = await TyreBrand.find({ _id: { $in: TyreModel.tyreBrand } });

//     // Map to get an array of names and images for tyre brands
//     const resolvedCarBrands = carBrandNames.map(brand => brand.name);
//     const resolvedCarModels = carModelNames.map(model => model.name);
//     const resolvedTyreBrands = tyreBrandNames.map(brand => ({
//       name: brand.name,
//       image: brand.image  // Include image URL or path
//     }));

//     // Attach resolved names and images to the tyre model
//     const result = {
//       ...TyreModel.toObject(), // Convert to plain object
//       carbrand: resolvedCarBrands,
//       carModel: resolvedCarModels,
//       tyreBrand: resolvedTyreBrands,
//       slug: decodedSlug  // Include slug
//     };

//     // Send the resolved tyre model as the response
//     res.json(result);
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
    } else if (tyreType === 'tractor') { // Add this block for tractors
      TyreModel = await TractorTyre.findOne({ slug: decodedSlug }).exec();
    } else {
      return res.status(400).json({ message: "Invalid tyreType. It must be 'car', 'bike', 'truck', or 'tractor'." });
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
    } else if (tyreType === 'tractor') { // Add this block for tractors
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
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting tyres" });
  }
};

//----------------------------- dealer categories checkbox api ----------------

// const GetCheckbox = async(req,res) =>{
//   const { selectedBrands, tyreTypes } = req.query;

//   const filters = {};
//   const brandsArray = selectedBrands ? JSON.parse(selectedBrands) : {};

//   try {
//     // Fetch tyres based on tyre type and brand selection
//     let carTyres = [];
//     let bikeTyres = [];

//     // Check if car tyre type is selected and filter accordingly
//     if (tyreTypes && JSON.parse(tyreTypes).car) {
//       carTyres = await CarTyre.find({
//         tyreType: 'car',
//         tyreBrand: { $in: brandsArray.car || [] }
//       });
//     }

//     // Check if bike tyre type is selected and filter accordingly
//     if (tyreTypes && JSON.parse(tyreTypes).bike) {
//       bikeTyres = await BikeTyre.find({
//         tyreType: 'bike',
//         tyreBrand: { $in: brandsArray.bike || [] }
//       });
//     }

//     // Combine both car and bike results if both types are selected
//     const filteredTyres = [...carTyres, ...bikeTyres];
//     res.json(filteredTyres);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch tyres' });
//   }

// }


// const GetCheckbox = async (req, res) => {
//   const { selectedBrands, tyreTypes } = req.query;

//   const filters = {};
//   const brandsArray = selectedBrands ? JSON.parse(selectedBrands) : {};

//   try {
//     // Fetch tyres based on tyre type and brand selection
//     let carTyres = [];
//     let bikeTyres = [];
//     let truckTyres = []; // New array for truck tyres

//     // Check if car tyre type is selected and filter accordingly
//     if (tyreTypes && JSON.parse(tyreTypes).car) {
//       carTyres = await CarTyre.find({
//         tyreType: 'car',
//         tyreBrand: { $in: brandsArray.car || [] }
//       });
//     }

//     // Check if bike tyre type is selected and filter accordingly
//     if (tyreTypes && JSON.parse(tyreTypes).bike) {
//       bikeTyres = await BikeTyre.find({
//         tyreType: 'bike',
//         tyreBrand: { $in: brandsArray.bike || [] }
//       });
//     }

//     // Check if truck tyre type is selected and filter accordingly
//     if (tyreTypes && JSON.parse(tyreTypes).truck) {
//       truckTyres = await TruckTyre.find({ // Assuming you have a TruckTyre model
//         tyreType: 'truck',
//         tyreBrand: { $in: brandsArray.truck || [] }
//       });
//     }

//     // Combine all results
//     const filteredTyres = [...carTyres, ...bikeTyres, ...truckTyres];
//     res.json(filteredTyres);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch tyres' });
//   }
// }


const GetCheckbox = async (req, res) => {
  const { selectedBrands, tyreTypes } = req.query;

  const filters = {};
  const brandsArray = selectedBrands ? JSON.parse(selectedBrands) : {};

  try {
    // Fetch tyres based on tyre type and brand selection
    let carTyres = [];
    let bikeTyres = [];
    let truckTyres = []; // New array for truck tyres
    let tractorTyres = []; // New array for tractor tyres

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

    // Check if truck tyre type is selected and filter accordingly
    if (tyreTypes && JSON.parse(tyreTypes).truck) {
      truckTyres = await TruckTyre.find({
        tyreType: 'truck',
        tyreBrand: { $in: brandsArray.truck || [] }
      });
    }

    // Check if tractor tyre type is selected and filter accordingly
    if (tyreTypes && JSON.parse(tyreTypes).tractor) {
      tractorTyres = await TractorTyre.find({
        tyreType: 'tractor',
        tyreBrand: { $in: brandsArray.tractor || [] }
      });
    }

    // Combine all results
    const filteredTyres = [...carTyres, ...bikeTyres, ...truckTyres, ...tractorTyres];
    res.json(filteredTyres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tyres' });
  }
}

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

const bestdeal = async (req, res) => {
  try {
    // Fetch all active car, bike, truck, and tractor tyres
    const carTyres = await CarTyre.find({ active: true });
    const bikeTyres = await BikeTyre.find({ active: true });
    const truckTyres = await TruckTyre.find({ active: true }); // Fetch active truck tyres
    const tractorTyres = await TractorTyre.find({ active: true }); // Fetch active tractor tyres

    // Function to calculate discount percentage
    const calculateDiscount = (price, salesPrice) => {
      return ((price - salesPrice) / price) * 100;
    };

    // Filter best deals (10% or more discount)
    const bestCarDeals = carTyres.filter(tyre => {
      if (tyre.price > 0 && tyre.Salesprice > 0) {
        const discount = calculateDiscount(tyre.price, tyre.Salesprice);
        return discount >= 10; // Only include 10%+ discount
      }
      return false;
    });

    const bestBikeDeals = bikeTyres.filter(tyre => {
      if (tyre.price > 0 && tyre.Salesprice > 0) {
        const discount = calculateDiscount(tyre.price, tyre.Salesprice);
        return discount >= 10;
      }
      return false;
    });

    const bestTruckDeals = truckTyres.filter(tyre => {
      if (tyre.price > 0 && tyre.Salesprice > 0) {
        const discount = calculateDiscount(tyre.price, tyre.Salesprice);
        return discount >= 10;
      }
      return false;
    });

    const bestTractorDeals = tractorTyres.filter(tyre => {
      if (tyre.price > 0 && tyre.Salesprice > 0) {
        const discount = calculateDiscount(tyre.price, tyre.Salesprice);
        return discount >= 10;
      }
      return false;
    });

    res.json({
      success: true,
      carDeals: bestCarDeals,
      bikeDeals: bestBikeDeals,
      truckDeals: bestTruckDeals, // Include truck deals in the response
      tractorDeals: bestTractorDeals // Include tractor deals in the response
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