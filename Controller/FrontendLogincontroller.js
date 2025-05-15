

import frontlogin from "../Models/FrontendLoginModel.js";


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const otpStore = {}; 


// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};





//--------------------register page --------------------



const FrontendRegister = async (req, res) => {
  const { name, lastname, companyname, mobilenumber, email, otp, address, city, state, pincode } = req.body;

  try {
      // Check if user already exists
      const existingUser = await frontlogin.findOne({ mobilenumber });
      if (existingUser) {
          return res.status(400).json({ message: 'User with this mobile number already exists' });
      }

      // Create a new frontend user
      const newUser = new frontlogin({
          name,
          lastname,
          companyname,
          mobilenumber,
          email,
          otp, // Consider hashing OTP if needed
          address,
          city,
          state,
          pincode
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Return success response
      return res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};


// const FrontendRegister = async (req, res) => {
//     const {
//         name,
//         lastname,
//         companyname,
//         mobilenumber,
//         email,
//         otp,
//         address,
//         city,
//         state,
//         pincode
//     } = req.body;

//     try {
//         // Check if OTP was verified for this email
//         if (!otpStore[email]) {
//             return res.status(400).json({ message: "OTP not verified for this email" });
//         }

//         // Check if user already exists
//         const existingUser = await frontlogin.findOne({ mobilenumber });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User with this mobile number already exists' });
//         }

//         // Create a new frontend user
//         const newUser = new frontlogin({
//             name,
//             lastname,
//             companyname,
//             mobilenumber,
//             email,
//             otp, // Store only if necessary
//             address,
//             city,
//             state,
//             pincode
//         });

//         // Save the user to the database
//         const savedUser = await newUser.save();

//         // Optional: Clean up OTP store
//         delete otpStore[email];

//         // Return success response
//         return res.status(201).json({ message: 'User registered successfully', user: savedUser });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
//     }
// };



// Send OTP to email
const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes expiration

  otpStore[email] = { otp, expirationTime };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: "your-email@example.com", // Replace with your email
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
const verifyOtpFromEmail = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const storedOtpData = otpStore[email];

  if (!storedOtpData) {
    return res.status(400).json({ message: "OTP not generated" });
  }

  if (Date.now() > storedOtpData.expirationTime) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (parseInt(otp) === storedOtpData.otp) {
    delete otpStore[email]; // Clear OTP after successful verification
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};





//---------------------------front end log home page--------------------------

// const FrontendLogin = async (req, res) => {
//   const { mobilenumber } = req.body; // This field could be a mobile number or email.

//   try {
//     // Determine whether the input is a number or a string
//     const isMobileNumber = /^\d+$/.test(mobilenumber);

//     // Find the user based on the input type
//     const query = isMobileNumber
//       ? { mobilenumber: Number(mobilenumber) } // Match mobilenumber
//       : { email: mobilenumber }; // Match email

//     const existingUser = await frontlogin.findOne(query);

//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     // Save the OTP to the user's record in the database
//     existingUser.otp = otp;
//     await existingUser.save();

//     return res.status(200).json({
//       message: `OTP sent to ${mobilenumber}`,
//       otp,
//       _id: existingUser._id// Send OTP in the response
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Something went wrong. Please try again later.",
//     });
//   }
// };





//front end login 
const FrontendLogin = async (req, res) => {
  const { mobilenumber } = req.body;

  try {
    // Check if it's a mobile number (only digits)
    const isMobileNumber = /^\d+$/.test(mobilenumber);

    // Search by mobile or email
    const query = isMobileNumber
      ? { mobilenumber: Number(mobilenumber) }
      : { email: mobilenumber };

    const existingUser = await frontlogin.findOne(query);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP to user record
    existingUser.otp = otp;
    await existingUser.save();

    // If input is email, send OTP to email
    if (!isMobileNumber) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Tyre Store" <${process.env.SMTP_USER}>`,
        to: existingUser.email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP is: <b>${otp}</b></p>`,
      };

      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({
      message: `OTP sent to ${mobilenumber}`,
      otp,
      _id: existingUser._id,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

// ✅ Add this new controller
const VerifyFrontendOtp = async (req, res) => {
  const { mobilenumber, otp } = req.body;

  try {
    const isMobileNumber = /^\d+$/.test(mobilenumber);

    const query = isMobileNumber
      ? { mobilenumber: Number(mobilenumber) }
      : { email: mobilenumber };

    const existingUser = await frontlogin.findOne(query);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Optional: Clear OTP after successful verification
    existingUser.otp = null;
    await existingUser.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      _id: existingUser._id,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


//-------------------front end login ------------------
// const loginpage = async (req,res) => {
//   const { emailOrMobile } = req.body;
  
//   if (!emailOrMobile) {
//     return res.status(400).json({ message: "Email or mobile is required." });
//   }

//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

//   // You can implement logic to send OTP to mobile or email here.

//   // Send OTP in response to the frontend
//   res.json({ message: "OTP sent successfully", otp });

// }


const loginpage = async (req, res) => {
  const { emailOrMobile } = req.body;

  if (!emailOrMobile) {
    return res.status(400).json({ message: "Email or mobile is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

  try {
    const isEmail = isNaN(emailOrMobile);

    if (isEmail) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Tyre Store" <${process.env.SMTP_USER}>`,
        to: emailOrMobile,
        subject: "Your OTP Code",
        html: `<p>Your OTP is: <b>${otp}</b></p>`,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.log(`Send OTP ${otp} to mobile number: ${emailOrMobile}`);
      // You can integrate Twilio or SMS gateway here
    }

    // ✅ Store OTP and expiry in memory
    otpStore[emailOrMobile] = { otp, expiresAt };

    return res.json({ message: "OTP sent successfully" }); // ✅ Don't send otp to client
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Failed to send OTP." });
  }
};


const verifyOtp = async (req, res) => {
  const { emailOrMobile, otp } = req.body;

  if (!emailOrMobile || !otp) {
    return res.status(400).json({ message: "Missing email/mobile or OTP" });
  }

  const stored = otpStore[emailOrMobile];
  if (!stored) return res.status(400).json({ message: "OTP not found" });

  if (Date.now() > stored.expiresAt)
    return res.status(400).json({ message: "OTP expired" });

  if (stored.otp.toString() !== otp.toString())
    return res.status(400).json({ message: "Invalid OTP" });

  delete otpStore[emailOrMobile]; // Cleanup
  return res.json({ message: "OTP verified" });
};




//----------------------update acc details -----------

const FrontendUpdate = async (req, res) => {
  const { id, name, lastname, companyname, mobilenumber, email, address, city, state, pincode } = req.body;

  try {
      // Find the user by their ID
      const existingUser = await frontlogin.findById(id); // Use ID here
      if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
      }


      // Update user fields
      existingUser.name = name || existingUser.name;
      existingUser.lastname = lastname || existingUser.lastname;
      existingUser.companyname = companyname || existingUser.companyname;
      existingUser.mobilenumber = mobilenumber || existingUser.mobilenumber;
      existingUser.email = email || existingUser.email;
      existingUser.address = address || existingUser.address;
      existingUser.city = city || existingUser.city;
      existingUser.state = state || existingUser.state;
      existingUser.pincode = pincode || existingUser.pincode;

      

      // Save updated user to the database
      const updatedUser = await existingUser.save();


      // Return success response with the updated user
      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};



//----------------get details in input -----------------


// // Get user data by id
const getdetailsbyId = async (req, res) => {
try {
    const { id } = req.params;

    const user = await frontlogin.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}







export {
  FrontendRegister,
  sendOtpToEmail,
  verifyOtpFromEmail,
  FrontendLogin,
  loginpage ,
  verifyOtp,
  FrontendUpdate,
  getdetailsbyId,
  VerifyFrontendOtp

};
