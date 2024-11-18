import mongoose from "mongoose";

const Frontendlogin = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const frontlogin = mongoose.model('frontenduser', Frontendlogin);
export default frontlogin;