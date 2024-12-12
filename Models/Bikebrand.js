// import mongoose from 'mongoose';

// const  BikebrandSchema = new mongoose.Schema({
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
//   active: {
//     type: Boolean,
//     default: true, 
//   },
// }, { timestamps: true }
// );



// const BikeBrand = mongoose.model('BikeBrand', BikebrandSchema);

// export default BikeBrand;



import mongoose from 'mongoose';

const BikeBrandSchema = new mongoose.Schema(
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
        ref: 'BikeModel', // Reference to BikeModel
      },
    ],
  },
  { timestamps: true }
);

const BikeBrand = mongoose.model('BikeBrand', BikeBrandSchema);

export default BikeBrand;
