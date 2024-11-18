import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  contactpersonname: {
    type: String,
    required: true,
   
  },
  contactNumber: {
    type: String,
    required: true,
   
  },
  
  mobileNumber: {
    type: String,
    required: true,
   
  },
  address: {
    type: String,
    required: true,
   
  },
  emailId: {
    type: String,
    required: true,
   
  },
  pincode: {
    type: String,
    required: true,
    
  },
  password:{
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  tyreBrand: {
    type: [String],
    required: true
  },
  active: {
    type: Boolean,
    default: true, // Default to true if you want the brand to be active when created
  },
}, { timestamps: true });



const Contact = mongoose.model('Dealer', contactSchema);

export default Contact;





