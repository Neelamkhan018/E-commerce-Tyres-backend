import mongoose from 'mongoose';

const  BikeModelSchema = new mongoose.Schema({
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
    ref: 'BikeBrand' 
  },
  active: {
    type: Boolean,
    default: true, // Default to true if you want the brand to be active when created
  },
}, { timestamps: true }

);

const BikeModel = mongoose.model('BikeModel',  BikeModelSchema);

export default BikeModel;