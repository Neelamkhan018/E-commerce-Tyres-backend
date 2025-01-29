
import express from "express";
import Accinfo from "../Models/Accountinfomodel.js"; // Import the Accinfo model

const AddAccinfo = async (req, res)=>{ 
    try {
        const { firstName, lastName, MobileNumber, email } = req.body;
    
        // Validate the required fields
        if (!firstName || !lastName || !MobileNumber || !email) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
    
        // Create a new Accinfo document
        const newAccinfo = new Accinfo({
          firstName,
          lastName,
          MobileNumber,
          email,
        });
    
        // Save the new customer information to the database
        await newAccinfo.save();
    
        res.status(201).json({ message: 'Account information created successfully', customer: newAccinfo });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}


export {AddAccinfo }