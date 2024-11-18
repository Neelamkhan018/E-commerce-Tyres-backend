import mongoose from 'mongoose';

const  CarModelSchema = new mongoose.Schema({
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
  brand_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'CarBrand' 
  },

  active: {
    type: Boolean,
    default: true, // Default to true if you want the brand to be active when created
  },
}, { timestamps: true });

const CarModel = mongoose.model('CarModel', CarModelSchema);

export default CarModel;

