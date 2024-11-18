import express from 'express';
import Businessmodel from '../Models/BusinessDetails.js';




const router = express.Router();


const AddBusinessDetails = async (req,res)=>{
    try {
        const { storename, productCategory, address, method, leastTime } = req.body;
        const newBusiness = new Businessmodel({
            storename,
            productCategory,
            address,
            method,
            leastTime,
        });

        await newBusiness.save();
        res.status(201).json({ message: 'Business added successfully', business: newBusiness });
    } catch (error) {
        console.error('Error while adding business:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export {AddBusinessDetails}