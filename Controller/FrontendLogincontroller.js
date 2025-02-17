

import frontlogin from "../Models/FrontendLoginModel.js";

// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};

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



const FrontendLogin = async (req, res) => {
  const { mobilenumber } = req.body; // This field could be a mobile number or email.

  try {
    // Determine whether the input is a number or a string
    const isMobileNumber = /^\d+$/.test(mobilenumber);

    // Find the user based on the input type
    const query = isMobileNumber
      ? { mobilenumber: Number(mobilenumber) } // Match mobilenumber
      : { email: mobilenumber }; // Match email

    const existingUser = await frontlogin.findOne(query);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP to the user's record in the database
    existingUser.otp = otp;
    await existingUser.save();

    return res.status(200).json({
      message: `OTP sent to ${mobilenumber}`,
      otp, // Send OTP in the response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};


const loginpage = async (req,res) => {
  const { emailOrMobile } = req.body;
  
  if (!emailOrMobile) {
    return res.status(400).json({ message: "Email or mobile is required." });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  // You can implement logic to send OTP to mobile or email here.

  // Send OTP in response to the frontend
  res.json({ message: "OTP sent successfully", otp });

}


export {
  FrontendRegister,
  FrontendLogin,
  loginpage


};
