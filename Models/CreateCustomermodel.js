
import mongoose from "mongoose";

const CustomerCreateAccount = new mongoose.Schema({

    mobileNumber:Number,
    password:String,
    otp:Number,
});

const Customeraccount = mongoose.model('customeraccount',CustomerCreateAccount);
export default Customeraccount;