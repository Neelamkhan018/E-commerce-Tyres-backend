import express from 'express';
import Businessmodel from '../Models/BusinessDetails.js';
import DealerPriceModel from '../Models/Dealerpricemodel.js';


const router = express.Router();


// const AddBusinessDetails = async (req, res) => {
//     try {
//         const { storename, productCategory, address, method, leastTime, pincode, clientId } = req.body;

//         if (!clientId) {
//             return res.status(400).json({ error: 'Client ID is required' });
//         }

//         const newBusiness = new Businessmodel({
//             storename,
//             productCategory,
//             address,
//             method,
//             leastTime,
//             pincode,
//             clientId, // Store clientId in database
//         });

//         await newBusiness.save();
//         res.status(201).json({ message: 'Business added successfully', business: newBusiness });
//     } catch (error) {
//         console.error('Error while adding business:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };




const AddBusinessDetails = async (req, res) => {
    try {
        const { storename, productCategory, address, method, leastTime, pincode, clientId } = req.body;

        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        if (!Array.isArray(pincode)) {
            return res.status(400).json({ error: 'Pincode must be an array' });
        }

        const newBusiness = new Businessmodel({
            storename,
            productCategory,
            address,
            method,
            leastTime,
            pincode,
            clientId,
        });

        await newBusiness.save();
        res.status(201).json({ message: 'Business added successfully', business: newBusiness });
    } catch (error) {
        console.error('Error while adding business:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





const getAddress = async (req, res) => {
    try {
        const { leastTime, pincode, tyreId } = req.query;

        // Validate input
        if (!leastTime || !pincode || !tyreId) {
            return res.status(400).json({ error: 'leastTime, pincode, and tyreId are required' });
        }

        // Find dealers that match the exact pincode and leastTime
        const businesses = await Businessmodel.find({
            pincode,
            leastTime
        });

        // For each business, fetch their tyre prices
        const businessesWithPrices = await Promise.all(
            businesses.map(async (business) => {
                const prices = await DealerPriceModel.find({
                    clientId: business.clientId,
                    tyreId
                });

                return {
                    ...business.toObject(),
                    prices
                };
            })
        );

        if (businessesWithPrices.length === 0) {
            return res.status(404).json({ message: 'No dealers found for the given criteria' });
        }

        // Return matched dealers and their prices
        res.status(200).json({
            message: 'Dealers fetched successfully',
            businesses: businessesWithPrices
        });

    } catch (error) {
        console.error('Error fetching dealers:', error);
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