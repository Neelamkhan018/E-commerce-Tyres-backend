import mongoose from 'mongoose';

const ShippingAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true }, // Renamed from company or phoneNumber
  townOrCity: { type: String, required: true }, // Renamed to 'townOrCity'
  state: { type: String, required: true },
  pincode: { type: String, required: true }, // Renamed from zip
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'frontuser' }, // Link to user model
  
});

const ShippingAddress = mongoose.model('ShippingAddress', ShippingAddressSchema);



export default ShippingAddress;
