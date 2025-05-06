
import mongoose from "mongoose";

// const BusinessSchema = new mongoose.Schema({
//    clientId: { type: String, required: true, ref: "dealerregister" }, 
//    storename: String,
//    productCategory: String,
//    address: String,
//    method: [String], // Array for multiple methods
//    leastTime: String,
//    pincode: String, // Added pincode field
//    prices: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealerPrice" }] // Reference to DealerPrice
// });


const BusinessSchema = new mongoose.Schema({
   clientId: { type: String, required: true, ref: "dealerregister" },
   storename: String,
   productCategory: String,
   address: String,
   method: [String],
   leastTime: String,
   pincode: String,
   prices: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealerPrice" }],
   location: {
       type: {
           type: String,
           enum: ["Point"],
           default: "Point"
       },
       coordinates: {
           type: [Number], // [longitude, latitude]
           index: "2dsphere" // Enables Geo Queries
       }
   }
});


const Businessmodel = mongoose.model('Businessmodeluser', BusinessSchema);








export default Businessmodel;


