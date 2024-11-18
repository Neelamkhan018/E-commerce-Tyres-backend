import mongoose from 'mongoose';

const  CarbrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  slug: {
    type: String,
    required: true,  
    unique: true,    
  },
  description: {
    type: String,    
  },
  image: {
    type: Array,    
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true, // Default to true if you want the brand to be active when created
  },
}, { timestamps: true });

const CarBrand = mongoose.model('CarBrand', CarbrandSchema);

export default CarBrand;



