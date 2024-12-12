// import mongoose from 'mongoose';

// const  CarbrandSchema = new mongoose.Schema({
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
//     type: Array,    
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   active: {
//     type: Boolean,
//     default: true, // Default to true if you want the brand to be active when created
//   },
//   models: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CarModel', // Reference to CarModel
//   }],
// }, { timestamps: true });



// const CarBrand = mongoose.model('CarBrand', CarbrandSchema);

// export default CarBrand;



import mongoose from 'mongoose';

const CarbrandSchema = new mongoose.Schema({
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
      ref: 'CarModel', // Reference to CarModel
    },
  ],
}, { timestamps: true });

const CarBrand = mongoose.model('CarBrand', CarbrandSchema);

export default CarBrand;
