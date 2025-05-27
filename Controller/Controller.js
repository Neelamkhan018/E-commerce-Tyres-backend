
import  {Accessories, AlloyWheel, Battery, BikeTyre, CarTyre, TractorTyre, TruckTyre} from "../Models/adminModel.js";
import userModel from "../Models/UserModel.js";
import multer from 'multer'

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

      

      let addresses = [];
      try {
        addresses = Array.isArray(rawAddresses) ? rawAddresses : JSON.parse(rawAddresses);
        console.log("Parsed Addresses:", addresses);
      } catch (e) {
        console.error("Error parsing addresses:", e);
        return res.status(400).send({ message: "Invalid addresses format" });
      }

    
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

const showProductFunction = async (req, res) => {
  try {
    // Step 1: Fetch all products in parallel
    const [
      carTyres, bikeTyres, truckTyres, tractorTyres,
      batteries, alloyWheels, accessories
    ] = await Promise.all([
      CarTyre.find().lean().exec(),
      BikeTyre.find().lean().exec(),
      TruckTyre.find().lean().exec(),
      TractorTyre.find().lean().exec(),
      Battery.find().lean().exec(),
      AlloyWheel.find().lean().exec(),
      Accessories.find().lean().exec()
    ]);

    // Step 2: Fetch all brand/model data in parallel
    // List all involved brand/model collections
    const [
      carBrands, carModels,
      bikeBrands, bikeModels,
      truckBrands, truckModels,
      tractorBrands, tractorModels,
      batteryBrands, batteryModels,
      alloyBrands, alloyModels,
      accessoryBrands, accessoryModels,
      tyreBrands
    ] = await Promise.all([
      CarBrand.find().lean().exec(), CarModel.find().lean().exec(),
      BikeBrand.find().lean().exec(), BikeModel.find().lean().exec(),
      TruckBrand.find().lean().exec(), TruckModel.find().lean().exec(),
      TractorBrand.find().lean().exec(), TractorModel.find().lean().exec(),
      BatteryBrand.find().lean().exec(), BatteryModel.find().lean().exec(),
      AlloyWheelBrand.find().lean().exec(), AlloyWheelModel.find().lean().exec(),
      AccessoriesBrand.find().lean().exec(), AccessoriesModel.find().lean().exec(),
      TyreBrand.find().lean().exec()
    ]);

    // Step 3: Build lookup maps ID -> name for each brand/model
    const buildLookup = (arr) => {
      const map = new Map();
      arr.forEach(item => map.set(item._id.toString(), item.name));
      return map;
    };

    const carBrandMap = buildLookup(carBrands);
    const carModelMap = buildLookup(carModels);
    const bikeBrandMap = buildLookup(bikeBrands);
    const bikeModelMap = buildLookup(bikeModels);
    const truckBrandMap = buildLookup(truckBrands);
    const truckModelMap = buildLookup(truckModels);
    const tractorBrandMap = buildLookup(tractorBrands);
    const tractorModelMap = buildLookup(tractorModels);
    const batteryBrandMap = buildLookup(batteryBrands);
    const batteryModelMap = buildLookup(batteryModels);
    const alloyBrandMap = buildLookup(alloyBrands);
    const alloyModelMap = buildLookup(alloyModels);
    const accessoryBrandMap = buildLookup(accessoryBrands);
    const accessoryModelMap = buildLookup(accessoryModels);
    const tyreBrandMap = buildLookup(tyreBrands);

    // Helper: split IDs safely and return array of strings
    const safeSplit = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') return value.split(',').map(id => id.trim());
      return [];
    };

    // Helper: map IDs to names using lookup map
    const mapIdsToNames = (ids, lookupMap) =>
      ids.map(id => lookupMap.get(id)).filter(Boolean);

    // Helper to replace brand/model IDs with names in product object fields
    // Accepts an object with keys = field names in product, values = lookups
    // Uses first element of array field as string of comma separated IDs (based on original code)
    const replaceIdsWithNames = (product, fieldToLookupMap) => {
      const newObj = { ...product };
      for (const [field, lookupMap] of Object.entries(fieldToLookupMap)) {
        let ids = [];
        if (Array.isArray(product[field])) {
          // original code uses product[field][0] with safeSplit if it's string
          if (product[field][0]) {
            ids = safeSplit(product[field][0]);
          }
        } else {
          ids = safeSplit(product[field]);
        }
        newObj[field] = mapIdsToNames(ids, lookupMap);
      }
      return newObj;
    };

    // Now process products with correct mappings

    // Car tyres
    const updatedCarTyres = carTyres.map(tyre =>
      replaceIdsWithNames(tyre, {
        carbrand: carBrandMap,
        carModel: carModelMap,
        tyreBrand: tyreBrandMap
      })
    );

    // Bike tyres
    const updatedBikeTyres = bikeTyres.map(tyre =>
      replaceIdsWithNames(tyre, {
        bikeBrand: bikeBrandMap,
        bikeModel: bikeModelMap,
        tyreBrand: tyreBrandMap
      })
    );

    // Truck tyres
    const updatedTruckTyres = truckTyres.map(tyre =>
      replaceIdsWithNames(tyre, {
        truckBrand: truckBrandMap,
        truckModel: truckModelMap,
        tyreBrand: tyreBrandMap
      })
    );

    // Tractor tyres
    const updatedTractorTyres = tractorTyres.map(tyre =>
      replaceIdsWithNames(tyre, {
        tractorBrand: tractorBrandMap,
        tractorModel: tractorModelMap,
        tyreBrand: tyreBrandMap
      })
    );

    // Batteries need some extra mapping for car/bike depending on batteryType
    const updatedBatteries = batteries.map(battery => {
      const updatedBattery = replaceIdsWithNames(battery, {
        BatteryBrand: batteryBrandMap,
        BatteryModel: batteryModelMap,
        tyreBrand: tyreBrandMap
      });

      let carbrand = [];
      let carModel = [];
      let bikeBrand = [];
      let bikeModel = [];

      if (battery.batteryType === 'car') {
        carbrand = mapIdsToNames(safeSplit(battery.carbrand), carBrandMap);
        carModel = mapIdsToNames(safeSplit(battery.carModel), carModelMap);
      } else if (battery.batteryType === 'bike') {
        bikeBrand = mapIdsToNames(safeSplit(battery.bikeBrand), bikeBrandMap);
        bikeModel = mapIdsToNames(safeSplit(battery.bikeModel), bikeModelMap);
      }

      return {
        ...updatedBattery,
        carbrand,
        carModel,
        bikeBrand,
        bikeModel
      };
    });

    // Alloy wheels similarly
    const updatedAlloyWheels = alloyWheels.map(wheel => {
      const updatedWheel = replaceIdsWithNames(wheel, {
        alloywheelBrand: alloyBrandMap,
        alloywheelModel: alloyModelMap,
        tyreBrand: tyreBrandMap
      });

      let carbrand = [];
      let carModel = [];
      let bikeBrand = [];
      let bikeModel = [];

      if (wheel.alloywheelType === 'car') {
        carbrand = mapIdsToNames(safeSplit(wheel.carbrand), carBrandMap);
        carModel = mapIdsToNames(safeSplit(wheel.carModel), carModelMap);
      } else if (wheel.alloywheelType === 'bike') {
        bikeBrand = mapIdsToNames(safeSplit(wheel.bikeBrand), bikeBrandMap);
        bikeModel = mapIdsToNames(safeSplit(wheel.bikeModel), bikeModelMap);
      }

      return {
        ...updatedWheel,
        carbrand,
        carModel,
        bikeBrand,
        bikeModel
      };
    });

    // Accessories need accessoryBrand and accessoryModel and tyreBrand replacements
    // But only if accessoryType is car or bike
    const updatedAccessories = accessories.map(accessory => {
      const updatedAccessory = { ...accessory };

      let accessoryBrandNames = [];
      let accessoryModelNames = [];

      if (accessory.accessoryType === 'car' || accessory.accessoryType === 'bike') {
        accessoryBrandNames = mapIdsToNames(safeSplit(accessory.accessoryBrand && accessory.accessoryBrand[0]), accessoryBrandMap);
        accessoryModelNames = mapIdsToNames(safeSplit(accessory.accessoryModel && accessory.accessoryModel[0]), accessoryModelMap);
      }

      const tyreBrandNames = mapIdsToNames(safeSplit(accessory.tyreBrand && accessory.tyreBrand[0]), tyreBrandMap);

      return {
        ...updatedAccessory,
        accessoryBrand: accessoryBrandNames,
        accessoryModel: accessoryModelNames,
        tyreBrand: tyreBrandNames
      };
    });

    // Combine updated products
    const products = [
      ...updatedCarTyres,
      ...updatedBikeTyres,
      ...updatedTruckTyres,
      ...updatedTractorTyres,
      ...updatedBatteries,
      ...updatedAlloyWheels,
      ...updatedAccessories
    ];

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

const Searchcarbike = async (req, res) => {
  try {
    const { tyreType, brand, model, tyreBrand, seasons } = req.params;
    
    

    let query = { active: true };

    if (tyreType === "car") {
        if (brand) query.carbrand = { $in: [brand] }; // Use $in for array fields
        if (model) query.carModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons; // Assuming seasons is a string



       

        const results = await CarTyre.find(query);
        return res.status(200).json(results);
    } else if (tyreType === "bike") {
        if (brand) query.bikeBrand = { $in: [brand] };
        if (model) query.bikeModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons;

        

        const results = await BikeTyre.find(query);
        return res.status(200).json(results);
    } else if (tyreType === "truck") {
        if (brand) query.truckBrand = { $in: [brand] };
        if (model) query.truckModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons;

        

        const results = await TruckTyre.find(query);
        return res.status(200).json(results);
    } else if (tyreType === "tractor") {
        if (brand) query.tractorBrand = { $in: [brand] };
        if (model) query.tractorModel = { $in: [model] };
        if (tyreBrand) query.tyreBrand = { $in: [tyreBrand] };
        if (seasons) query.seasons = seasons;

        

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