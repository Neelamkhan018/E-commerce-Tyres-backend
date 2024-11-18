import mongoose from "mongoose";

const DealerLogin = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const dealerloginModel = mongoose.model('dealeruser', DealerLogin);
export default dealerloginModel;