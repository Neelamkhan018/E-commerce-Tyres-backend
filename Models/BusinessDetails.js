
import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
   clientId: { type: String, required: true, ref: "dealerregister" }, 
   storename: String,
   productCategory: String,
   address: String,
   method: [String], // Array for multiple methods
   leastTime: String,
   pincode: String, // Added pincode field
   prices: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealerPrice" }] // Reference to DealerPrice
});

const Businessmodel = mongoose.model('Businessmodeluser', BusinessSchema);



export default Businessmodel;


