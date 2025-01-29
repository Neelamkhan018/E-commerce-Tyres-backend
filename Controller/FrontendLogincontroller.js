// import frontlogin from "../Models/FrontendLoginModel.js";

// const FrontendRegister = async (req,res)=>{
//     try {
//         const { name, email, password } = req.body;
    
//         // Check if the user already exists
//         const existingUser = await frontlogin.findOne({ email });
//         if (existingUser) {
//           return res.status(400).json({ message: "User already exists" });
//         }
    
//         // Create a new user
//         const newUser = new frontlogin({
//           name,
//           email,
//           password, // Storing password as plain text (not recommended for production)
//         });
    
//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });
//       } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//       }

// }


// const FrontendLogin = async (req,res)=>{
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await frontlogin.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Check if the password matches (for simplicity, comparing plain text)
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// }




// export {
//     FrontendRegister,
//     FrontendLogin,

// }





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





export {
  FrontendRegister,
  FrontendLogin,


};
