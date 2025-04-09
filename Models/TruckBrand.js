import mongoose from 'mongoose';

const TruckBrandSchema = new mongoose.Schema(
  {
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
      default: true, // Default to true if you want the brand to be active when created
    },
    models: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TruckModel', // Reference to TruckModel
      },
    ],
  },
  { timestamps: true }
);

const TruckBrand = mongoose.model('TruckBrand', TruckBrandSchema);

export default TruckBrand;
