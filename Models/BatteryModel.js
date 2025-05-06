import mongoose from 'mongoose';

const BatteryModelSchema = new mongoose.Schema({
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
    ref: 'BatteryBrand' // Reference to BatteryBrand
  },
  active: {
    type: Boolean,
    default: true, // Default to true if you want the model to be active when created
  },
}, { timestamps: true });

const BatteryModel = mongoose.model('BatteryModel', BatteryModelSchema);

export default BatteryModel;
