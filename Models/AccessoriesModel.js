import mongoose from 'mongoose';

const AccessoriesModelSchema = new mongoose.Schema({
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
    ref: 'AccessoriesBrand', // Reference to AccessoriesBrand
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const AccessoriesModel = mongoose.model('AccessoriesModel', AccessoriesModelSchema);

export default AccessoriesModel;
