import mongoose from 'mongoose';

const AlloyWheelModelSchema = new mongoose.Schema({
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
    ref: 'AlloyWheelBrand' // Reference to AlloyWheelBrand
  },
  active: {
    type: Boolean,
    default: true, // Default to true if you want the model to be active when created
  },
}, { timestamps: true });

const AlloyWheelModel = mongoose.model('AlloyWheelModel', AlloyWheelModelSchema);

export default AlloyWheelModel;
