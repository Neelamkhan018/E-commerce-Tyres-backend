


import mongoose from 'mongoose';

const AccessoriesBrandSchema = new mongoose.Schema({
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
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
  models: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AccessoriesModel',
    },
  ],
}, { timestamps: true });

const AccessoriesBrand = mongoose.models.AccessoriesBrand || mongoose.model('AccessoriesBrand', AccessoriesBrandSchema);

export default AccessoriesBrand;