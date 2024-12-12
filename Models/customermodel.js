import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String, required: false },
  phoneNumber: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },



});

const Customer = mongoose.model('customermodel', customerSchema);

export default Customer;
