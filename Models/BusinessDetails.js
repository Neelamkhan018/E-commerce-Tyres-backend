import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
   storename: String,
   productCategory: String,
   address: String,
   method: [String], // Change to array if method can hold multiple values
   leastTime: String,
});

const Businessmodel = mongoose.model('Businessmodeluser', BusinessSchema);
export default Businessmodel;