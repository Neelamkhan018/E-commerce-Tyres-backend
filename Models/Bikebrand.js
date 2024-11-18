import mongoose from 'mongoose';

const  BikebrandSchema = new mongoose.Schema({
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
  active: {
    type: Boolean,
    default: true, 
  },
}, { timestamps: true }
);



const BikeBrand = mongoose.model('BikeBrand', BikebrandSchema);

export default BikeBrand;