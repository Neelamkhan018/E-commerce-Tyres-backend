import mongoose from 'mongoose';

const BillingAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true }, // Renamed from company or phoneNumber
  townOrCity: { type: String, required: true }, // Renamed to 'townOrCity'
  state: { type: String, required: true },
  pincode: { type: String, required: true }, // Renamed from zip
});

const BillingAddress = mongoose.model('BillingAddress', BillingAddressSchema);



export default BillingAddress;
