// import mongoose from "mongoose";

// const DealerCreateAccount = new mongoose.Schema({
//     username:String,
//     mobileNumber:Number,
//     email:String,
//     password:String,
  
//     otp:String,
// });

// const dealeraccountModel = mongoose.model('dealeraccountuser', DealerCreateAccount);
// export default dealeraccountModel;


import mongoose from 'mongoose';

const DealerCreateAccount = new mongoose.Schema({
    username: { type: String, required: true },
    mobileNumber: { type: Number, required: true }, // mobile as String
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true },
    otp: { type: String },
    otpExpiration: { type: Date },  // Store OTP expiration
});

const dealeraccountModel = mongoose.model('dealeraccountuser', DealerCreateAccount);



export default dealeraccountModel;


