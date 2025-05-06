import express from 'express';
import Businessmodel from '../Models/BusinessDetails.js';
import DealerPriceModel from '../Models/Dealerpricemodel.js';
import axios from "axios"; // Make sure axios is installed (npm install axios)





const router = express.Router();


const AddBusinessDetails = async (req, res) => {
    try {
        const { storename, productCategory, address, method, leastTime, pincode, clientId } = req.body;

        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        const newBusiness = new Businessmodel({
            storename,
            productCategory,
            address,
            method,
            leastTime,
            pincode,
            clientId, // Store clientId in database
        });

        await newBusiness.save();
        res.status(201).json({ message: 'Business added successfully', business: newBusiness });
    } catch (error) {
        console.error('Error while adding business:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// const AddBusinessDetails = async (req, res) => {
//     try {
//         const {
//             storename,
//             productCategory,
//             address,
//             method,
//             leastTime,
//             pincode,
//             clientId
//         } = req.body;

//         if (!clientId) {
//             return res.status(400).json({ error: 'Client ID is required' });
//         }

//         // Call OpenCage API to get latitude & longitude
//         const apiKey = "ca2e39f50dda4d6b8ab5666ebebf0df8"; // <-- Replace with your actual key
//         const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}&countrycode=in`);

//         if (
//             geoResponse.data.results.length === 0 ||
//             !geoResponse.data.results[0].geometry
//         ) {
//             return res.status(400).json({ error: 'Invalid pincode' });
//         }

//         const { lat, lng } = geoResponse.data.results[0].geometry;

//         const newBusiness = new Businessmodel({
//             storename,
//             productCategory,
//             address,
//             method,
//             leastTime,
//             pincode,
//             clientId,
//             location: {
//                 type: "Point",
//                 coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
//             },
//         });

//         await newBusiness.save();
//         res.status(201).json({ message: 'Business added successfully', business: newBusiness });
//     } catch (error) {
//         console.error('Error while adding business:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };





const getNearbyPincodes = (pincode) => {
    // This is a placeholder function. You should implement logic to find nearby pincodes.
    // For example, you could return a list of pincodes that are within a certain range.
    return [pincode, '400605', '400612','400604','400602']; // Example nearby pincodes
};

const getAddress = async (req, res) => {
    try {
        const { leastTime, pincode, tyreId } = req.query;

        // Validate the required fields
        if (!leastTime) {
            return res.status(400).json({ error: 'LeastTime is required' });
        }

        // Get nearby pincodes
        const nearbyPincodes = getNearbyPincodes(pincode);

        // Build the query object based on the provided parameters
        const query = { leastTime, pincode: { $in: nearbyPincodes } }; // Use $in to match any of the nearby pincodes

        // Query businesses that match the leastTime and optional pincode
        const businesses = await Businessmodel.find(query);

        // Fetch prices for each business
        const businessesWithPrices = await Promise.all(businesses.map(async (business) => {
            const prices = await DealerPriceModel.find({ clientId: business.clientId, tyreId });
            console.log(`Fetching prices for clientId: ${business.clientId}, tyreId: ${tyreId}`, prices); // Log the prices
            return {
                ...business.toObject(),
                prices
            };
        }));

        if (businessesWithPrices.length === 0) {
            return res.status(404).json({ message: 'No addresses found for the given criteria' });
        }

        res.status(200).json({ message: 'Addresses fetched successfully', businesses: businessesWithPrices });
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//  const getAddress = async (req, res) => {
//     const { pincode, leastTime, tyreId } = req.query;

//     if (!pincode || !leastTime || !tyreId) {
//         return res.status(400).json({ message: "Missing required parameters" });
//     }

//     try {
//         // 1. Get coordinates of the customer’s pincode using OpenCage API
//         const apiKey = "ca2e39f50dda4d6b8ab5666ebebf0df8"; // 🔐 Replace with your actual API key
//         const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}&countrycode=in`);

//         if (!geoResponse.data.results.length) {
//             return res.status(400).json({ message: "Invalid Pincode" });
//         }

//         const { lat, lng } = geoResponse.data.results[0].geometry;

//         // 2. Find dealers within 10 km of the user's location and matching the time slot
//         const nearbyDealers = await Businessmodel.find({
//             leastTime: leastTime,
//             location: {
//                 $nearSphere: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [lng, lat],
//                     },
//                     $maxDistance: 10000, // 10 km
//                 }
//             }
//         });

//         // 3. Attach price data from DealerPriceModel
//         const dealersWithPrices = await Promise.all(
//             nearbyDealers.map(async (dealer) => {
//                 const prices = await DealerPriceModel.find({
//                     clientId: dealer.clientId,
//                     tyreId: tyreId,
//                 });

//                 return {
//                     ...dealer.toObject(),
//                     prices,
//                 };
//             })
//         );

//         res.json({ businesses: dealersWithPrices });
//     } catch (error) {
//         console.error("Error fetching addresses:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };




// GET API to fetch store name by clientId
const getStoreName = async (req, res) => {
    try {
        const { clientId } = req.params;
        
        // Find the business by clientId
        const business = await Businessmodel.findOne({ clientId });
        
        if (!business) {
            return res.status(404).json({ message: "Store not found" });
        }
        
        res.status(200).json({ storename: business.storename });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




const getBusinessDetailsByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;

        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        const business = await Businessmodel.findOne({ clientId });

        if (!business) {
            return res.status(404).json({ message: 'Business details not found' });
        }

        res.status(200).json({ success: true, business });
    } catch (error) {
        console.error('Error fetching business details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





export {AddBusinessDetails , getAddress , getStoreName , getBusinessDetailsByClientId}