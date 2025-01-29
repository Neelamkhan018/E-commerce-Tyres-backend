// import mongoose from "mongoose";

// const Frontendlogin = new mongoose.Schema({
//     name:String,
//     lastname:String,
//     companyname:String,
//     phonenumber:Number,
//     email:String,
//     otp:Number,
//     address:String,
//     city:String,
//     state:String,
//     pincode:Number
// });

// const frontlogin = mongoose.model('frontenduser', Frontendlogin);
// export default frontlogin;



import mongoose from "mongoose";

const Frontendlogin = new mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    companyname: { type: String },
    mobilenumber: { type: Number, required: false },
    email: { type: String  , required: false,},
    otp: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number }
});

const frontlogin = mongoose.model('frontuser', Frontendlogin);



export default frontlogin;
