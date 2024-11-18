import express from 'express';
import dealeraccountModel from "../Models/DealerCreateModel.js";
import { randomInt } from 'crypto';

const otpStore = new Map();
import nodemailer from 'nodemailer'
import Gstmodel from '../Models/GstModel.js';

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


// Function to send OTP via email
const sendOTPEmail = async (email, otp) => {
  // Instead of sending an email, just log or return the OTP
  console.log(`Generated OTP for ${email}: ${otp}`);
  return otp; // Here you would typically send the email
};

// Dealer account creation function
const AddCreateDealer = async (req, res) => {
  const { username, mobileNumber, email, password, mobileOtp, emailOtp } = req.body;

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

    const newDealer = new dealeraccountModel({
      username,
      mobileNumber,
      email,
      password,
    });

    await newDealer.save();
    otpStore.delete(mobileNumber);
    otpStore.delete(email);

    res.status(201).json({ message: "Dealer account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating dealer account", error: error.message });
  }


}

// ------- Add Login -----------------
const AddDealerLogin = async (req,res)=>{

try {
  const { emailOrMobile } = req.body; // Expect email or mobile input

  // Check if the provided email or mobile number exists in the database
  const existingEntry = await dealeraccountModel.findOne({
      $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }]
  });

  // If the entry does not exist, send an error response
  if (!existingEntry) {
      return res.status(404).json({ message: "Email or mobile number not found." });
  }

  // Generate OTP and store it temporarily
  const otp = generateOtp();
  otpStore[emailOrMobile] = otp;

  // Log OTP for testing purposes
  console.log(`OTP for ${emailOrMobile}: ${otp}`);

  // Here, you would send the OTP to the user's email or mobile via a service

  // Send back the OTP in the response
  res.status(200).json({ message: "OTP sent successfully", otp }); 
} catch (error) {
  res.status(500).json({ message: "Server error", error });
}


}


// --------------------Add otp ------------------------

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



const addGstDetails = async (req,res)=>{
  const gstDetails = new Gstmodel(req.body);
    try {
        await gstDetails.save();
        return res.status(201).json({ message: 'GST details saved successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save GST details' });
    }

}

export { AddcreateOtp, AddCreateDealer,AddDealerLogin,AddLoginOtp,addGstDetails,GstgenerateOtp,GstVerifyOtp}






