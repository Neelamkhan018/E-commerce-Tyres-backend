import express from 'express';
import Businessmodel from '../Models/BusinessDetails.js';
import DealerPriceModel from '../Models/Dealerpricemodel.js';

const router = express.Router();

// const AddBusinessDetails = async (req,res)=>{
//     try {
//         const { storename, productCategory, address, method, leastTime ,  pincode } = req.body;
//         const newBusiness = new Businessmodel({
//             storename,
//             productCategory,
//             address,
//             method,
//             leastTime,
//             pincode, 
//         });

//         await newBusiness.save();
//         res.status(201).json({ message: 'Business added successfully', business: newBusiness });
//     } catch (error) {
//         console.error('Error while adding business:', error); // Log the error
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }




// const getAddress = async (req, res) => {
//     try {
//         const { leastTime } = req.query;

//         // Validate the required fields
//         if (!leastTime) {
//             return res.status(400).json({ error: 'LeastTime is required' });
//         }

//         // Query businesses that match the leastTime
//         const businesses = await Businessmodel.find({ leastTime });

//         if (businesses.length === 0) {
//             return res.status(404).json({ message: 'No addresses found for the given criteria' });
//         }

//         res.status(200).json({ message: 'Addresses fetched successfully', businesses });
//     } catch (error) {
//         console.error('Error fetching addresses:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };





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






// const getAddress = async (req, res) => {
//     try {
//         const { leastTime, pincode } = req.query;

//         // Validate the required fields
//         if (!leastTime) {
//             return res.status(400).json({ error: 'LeastTime is required' });
//         }

//         // Build the query object based on the provided parameters
//         const query = { leastTime };

//         if (pincode) {
//             query.pincode = pincode; // Add pincode filter if provided
//         }

//         // Query businesses that match the leastTime and optional pincode
//         const businesses = await Businessmodel.find(query);

//         if (businesses.length === 0) {
//             return res.status(404).json({ message: 'No addresses found for the given criteria' });
//         }

//         res.status(200).json({ message: 'Addresses fetched successfully', businesses });
//     } catch (error) {
//         console.error('Error fetching addresses:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// const getAddress = async (req, res) => {
//     try {
//         const { leastTime, pincode } = req.query;

//         // Validate the required fields
//         if (!leastTime) {
//             return res.status(400).json({ error: 'LeastTime is required' });
//         }

//         // Build the query object based on the provided parameters
//         const query = { leastTime, pincode };

//         // Query businesses that match the leastTime and optional pincode
//         const businesses = await Businessmodel.find(query);

//         // Fetch prices for each business
//         const businessesWithPrices = await Promise.all(businesses.map(async (business) => {
//             const prices = await DealerPriceModel.find({ clientId: business.clientId });
//             return {
//                 ...business.toObject(),
//                 prices
//             };
//         }));

//         if (businessesWithPrices.length === 0) {
//             return res.status(404).json({ message: 'No addresses found for the given criteria' });
//         }

//         res.status(200).json({ message: 'Addresses fetched successfully', businesses: businessesWithPrices });
//     } catch (error) {
//         console.error('Error fetching addresses:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const getAddress = async (req, res) => {
    try {
        const { leastTime, pincode, tyreId } = req.query;

        // Validate the required fields
        if (!leastTime) {
            return res.status(400).json({ error: 'LeastTime is required' });
        }

        // Build the query object based on the provided parameters
        const query = { leastTime, pincode };

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





export {AddBusinessDetails , getAddress}