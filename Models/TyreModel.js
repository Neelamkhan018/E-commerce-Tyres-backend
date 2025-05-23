


import mongoose from 'mongoose';

const TyreBrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    // unique: true,
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
  category: {
    type: String, // Removed enum to allow any string value
    required: true,
  },
}, { timestamps: true });

const TyreBrand = mongoose.model('TyreBrand', TyreBrandSchema);

export default TyreBrand;
