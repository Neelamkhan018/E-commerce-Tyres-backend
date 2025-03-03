// import mongoose from "mongoose";

// const GstSchema = new mongoose.Schema({
//     email:String,
//     mobileNumber:Number,
//     gstNumber:String,
//     panDetails:String,
//     bankAccount:Number
// });

// const Gstmodel = mongoose.model('Gstmodeluser', GstSchema);


// export default Gstmodel;



import mongoose from "mongoose";

const GstSchema = new mongoose.Schema({
    clientId: { type: String, required: true, ref: "dealerregister" }, 
    email: String,
    mobileNumber: Number,
    gstNumber: String,
    panDetails: String,
    bankAccount: Number
});

const Gstmodel = mongoose.model("Gstmodeluser", GstSchema);
export default Gstmodel;
