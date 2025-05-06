// import mongoose from 'mongoose';

// const AccessoriesBrandSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   description: {
//     type: String,
//   },
//   image: {
//     type: [String], // Array of strings, assuming these are URLs
//   },
//   active: {
//     type: Boolean,
//     default: true, // Brand is active by default
//   },
//   models: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'AccessoriesModel', // Reference to AccessoriesModel
//     },
//   ],
// }, { timestamps: true });

// const AccessoriesBrand = mongoose.model('AccessoriesBrand', AccessoriesBrandSchema);

// export default AccessoriesBrand;



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