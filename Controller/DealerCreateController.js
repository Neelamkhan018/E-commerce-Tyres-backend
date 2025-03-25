import express from 'express';
import dealeraccountModel from "../Models/DealerCreateModel.js";
import Businessmodel from "../Models/BusinessDetails.js"
import { randomInt } from 'crypto';

const otpStore = new Map();
import nodemailer from 'nodemailer'
import Gstmodel from '../Models/GstModel.js';
import DealerPriceModel from '../Models/Dealerpricemodel.js';

const generateOtp = () => randomInt(100000, 999999).toString(); // 6-digit OTP


const AddcreateOtp = async (req, res) => {
  const { mobileNumber, email, type } = req.body;

  const otp = generateOtp();
  if (type === 'mobile') {
    otpStore.set(mobileNumber, otp);
    return res.status(200).json({ message: "Mobile OTP generated", otp }); // Send OTP back in response
  } else if (type === 'email') {
    otpStore.set(email, otp);
    return res.status(200).json({ message: "Email OTP generated", otp }); // Send OTP back in response
  }
};


// // Function to send OTP via email
const sendOTPEmail = async (email, otp) => {
  // Instead of sending an email, just log or return the OTP
  console.log(`Generated OTP for ${email}: ${otp}`);
  return otp; // Here you would typically send the email
};





//  Dealer - register of dealer

const AddCreateDealer = async (req, res) => {
  console.log('Received Data:', req.body); // Debugging
  
  const { username, mobileNumber, email, password, mobileOtp, emailOtp } = req.body;

  if (!username || !mobileNumber || !email || !password || !mobileOtp || !emailOtp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingDealer = await dealeraccountModel.findOne({ email });
    if (existingDealer) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const storedMobileOtp = otpStore.get(mobileNumber);
    const storedEmailOtp = otpStore.get(email);

    if (!storedMobileOtp || storedMobileOtp !== mobileOtp || !storedEmailOtp || storedEmailOtp !== emailOtp) {
      return res.status(400).json({ message: "Invalid OTPs" });
    }

    // Create new dealer with clientId (assuming _id as clientId)
    const newDealer = new dealeraccountModel({
      username,
      mobileNumber,
      email,
      password,
      joinDate: new Date(), // Store the current date and time
    });

    const savedDealer = await newDealer.save();
    otpStore.delete(mobileNumber);
    otpStore.delete(email);

    res.status(201).json({ 
      message: "Dealer account created successfully",
      clientId: savedDealer._id, // Send clientId in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating dealer account", error: error.message });
  }
};




// ------- Add Login -----------------

const AddDealerLogin = async (req, res) => {
  const { emailOrMobile } = req.body;

  try {
    const isMobileNumber = /^\d+$/.test(emailOrMobile);
    const query = isMobileNumber
      ? { mobileNumber: emailOrMobile }
      : { email: emailOrMobile };

    const existingEntry = await dealeraccountModel.findOne(query);

    if (!existingEntry) {
      return res.status(404).json({ message: "Email or mobile number not found." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[emailOrMobile] = otp; // Store OTP in memory

    console.log(`OTP for ${emailOrMobile}: ${otp}`);

    return res.status(200).json({
      message: `OTP sent to ${emailOrMobile}`,
      otp,
      clientId: existingEntry._id, // Use _id if clientId is missing
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};




const AddLoginOtp = async(req,res)=>{

  try {
    const { emailOrMobile, otp } = req.body; // Expect email or mobile and OTP

    // Check if the provided email or mobile number exists in the database
    const existingEntry = await dealeraccountModel.findOne({
        $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }]
    });

    // If the entry does not exist, send an error response
    if (!existingEntry) {
        return res.status(404).json({ message: "Email or mobile number not found." });
    }

    // Check if the provided OTP matches the stored OTP
    if (otpStore[emailOrMobile] === otp) {
        delete otpStore[emailOrMobile]; // Remove the OTP after successful verification
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(400).json({ message: "Invalid OTP" });
    }
} catch (error) {
    res.status(500).json({ message: "Server error", error });
}


}

// GST Deatils

const GstgenerateOtp = async (req,res)=>{


  const { email, mobileNumber } = req.body; // Destructure email and mobileNumber from req.body

  if (!email || !mobileNumber) {
      return res.status(400).json({ message: 'Email and mobile number are required' });
  }

  // Generate OTP
  const otp = generateOtp();

  // Store OTP against email and mobile number
  otpStore[email] = { otp, verified: false };
  
  // For testing, log the OTP
  console.log(`OTP for ${email}: ${otp}`);
  console.log(`OTP for ${mobileNumber}: ${otp}`);

  // Return the OTP in the response (for testing purposes)
  return res.status(200).json({ message: 'OTP generated', otp }); // Send OTP in the response


}


const GstVerifyOtp = async (req,res)=>{
  const { email, otp } = req.body; // Destructure email and otp from req.body

  if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
  }

  if (otpStore[email] && otpStore[email].otp === otp) {
      otpStore[email].verified = true; // Mark OTP as verified
      return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
      return res.status(400).json({ message: 'Invalid OTP' });
  }
}


//gst post api 


const addGstDetails = async (req, res) => {
  try {
      const clientId = req.body.clientId; // Ensure clientId is included
      if (!clientId) {
          return res.status(400).json({ error: 'Client ID is required' });
      }

      const gstDetails = new Gstmodel(req.body);
      await gstDetails.save();
      return res.status(201).json({ message: 'GST details saved successfully' });
  } catch (error) {
      return res.status(500).json({ error: 'Failed to save GST details' });
  }
};


const getGstDetails = async (req, res) => {
  try {
    const { clientId } = req.params; // Extract clientId from request params

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const gstDetails = await Gstmodel.findOne({ clientId });

    if (!gstDetails) {
      return res.status(404).json({ message: "GST details not found" });
    }

    return res.status(200).json({ success: true, gst: gstDetails });
  } catch (error) {
    console.error("Error fetching GST details:", error);
    return res.status(500).json({ error: "Failed to retrieve GST details" });
  }
};




//  This  api is for dealer list 
const getAllDealers = async (req, res) => {
  try {
    const dealers = await dealeraccountModel.find();
    res.status(200).json({ success: true, dealers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching dealers", error: error.message });
  }
};



const getDealerById = async (req, res) => {
  try {
    const { id } = req.params;
    const dealer = await dealeraccountModel.findById(id);

    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    res.status(200).json({ success: true, dealer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching dealer", error: error.message });
  }
};






export { AddcreateOtp, 
  AddCreateDealer,
  AddDealerLogin,
  AddLoginOtp,
  addGstDetails,
  GstgenerateOtp,
  GstVerifyOtp,
  getAllDealers,
getDealerById , 
getGstDetails
}






