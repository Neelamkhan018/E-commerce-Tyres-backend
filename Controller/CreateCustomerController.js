import Customeraccount from "../Models/CreateCustomermodel.js";




const AddCreatecustomer = async(req,res)=>{
    const { mobileNumber, password } = req.body;

    // Check if mobileNumber and password are provided
    if (!mobileNumber || !password) {
        return res.status(400).json({ message: "Mobile number and password are required" });
    }

    // Generate a random 6-digit OTP using random integer approach
    const otp = Math.floor(100000 + Math.random() * 900000);  // Generates a random integer between 100000 and 999999

    try {
        // Create a new customer account
        const newAccount = new Customeraccount({
            mobileNumber,
            password,
            otp
        });

        // Save the account to the database
        await newAccount.save();

        // Send a response with the OTP and success message
        res.status(201).json({
            message: "Account created successfully! OTP has been generated.",
            otp // You can remove this in production, this is for testing
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}




export {
    AddCreatecustomer,
}



