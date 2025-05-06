import mongoose from 'mongoose';

const AlloyWheelBrandSchema = new mongoose.Schema({
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
    type: [String], // Array of strings, assuming these are URLs
  },
  active: {
    type: Boolean,
    default: true, // Brand is active by default
  },
  models: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AlloyWheelModel', // Reference to AlloyWheelModel
    },
  ],
}, { timestamps: true });

const AlloyWheelBrand = mongoose.model('AlloyWheelBrand', AlloyWheelBrandSchema);

export default AlloyWheelBrand;
