import mongoose from "mongoose";

const DealerCreateAccount = new mongoose.Schema({
    username:String,
    mobileNumber:Number,
    email:String,
    password:String,
  
    otp:String,
});

const dealeraccountModel = mongoose.model('dealeraccountuser', DealerCreateAccount);
export default dealeraccountModel;