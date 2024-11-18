import mongoose from 'mongoose';

const TyreBrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  slug: {
    type: String,
    required: true,  // Unique slug for the brand (used in URLs, etc.)
    unique: true,    
  },
  description: {
    type: String,    // Brief description of the tyre brand
  },
  image: {
    type: Array,    // URL or file path to the image of the brand
  },
  active: {
    type: Boolean,
    default: true, // Default to true if you want the brand to be active when created
  },
}, { timestamps: true });


const TyreBrand = mongoose.model('TyreBrand', TyreBrandSchema);

export default TyreBrand;