import mongoose from 'mongoose';

const BatteryBrandSchema = new mongoose.Schema({
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
      ref: 'BatteryModel', // Reference to BatteryModel
    },
  ],
}, { timestamps: true });

const BatteryBrand = mongoose.model('BatteryBrand', BatteryBrandSchema);

export default BatteryBrand;
