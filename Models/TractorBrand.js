import mongoose from 'mongoose';

const TractorBrandSchema = new mongoose.Schema(
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
      type: [String], // Array of image URLs
    },
    active: {
      type: Boolean,
      default: true,
    },
    models: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TractorModel', // Reference to TractorModel
      },
    ],
  },
  { timestamps: true }
);

const TractorBrand = mongoose.model('TractorBrand', TractorBrandSchema);

export default TractorBrand;
