



import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import Bankmodel from "../Models/BankdetailsModel.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());




// const AddBankDetails = async (req,res)=>{
//     try {
//         const { bankAccount, reenteraccountnumber } = req.body;

//         // Backend validation
//         if (bankAccount !== reenteraccountnumber) {
//             return res.status(400).json({ message: 'Bank account numbers do not match.' });
//         }

//         const newBankDetail = new Bankmodel(req.body);
//         await newBankDetail.save();
//         res.status(201).json({ message: 'Bank details added successfully!' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding bank details', error });
//     }
// }




const AddBankDetails = async (req, res) => {
    try {
        const clientId = req.body.clientId; // Ensure clientId is included
        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        const { bankAccount, reenteraccountnumber } = req.body;
        if (bankAccount !== reenteraccountnumber) {
            return res.status(400).json({ message: 'Bank account numbers do not match.' });
        }

        const newBankDetail = new Bankmodel(req.body);
        await newBankDetail.save();
        res.status(201).json({ message: 'Bank details added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding bank details', error });
    }
};


export {
    AddBankDetails
}