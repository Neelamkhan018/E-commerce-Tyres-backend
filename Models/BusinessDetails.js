// import mongoose from "mongoose";

// const BusinessSchema = new mongoose.Schema({
//    storename: String,
//    productCategory: String,
//    address: String,
//    method: [String], // Change to array if method can hold multiple values
//    leastTime: String,
// });

// const Businessmodel = mongoose.model('Businessmodeluser', BusinessSchema);
// export default Businessmodel;


import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
   storename: String,
   productCategory: String,
   address: String,
   method: [String], // Array for multiple methods
   leastTime: String,
   pincode: String, // Added pincode field
});

const Businessmodel = mongoose.model('Businessmodeluser', BusinessSchema);



export default Businessmodel;
