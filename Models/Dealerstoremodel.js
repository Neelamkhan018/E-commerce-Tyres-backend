import mongoose from 'mongoose';

const DealerStore = new mongoose.Schema({
  
    clientId: {
      type: String,
      required: true,
      unique: true, // Each client has a unique dealer list
    },
    tyres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TyreBrand", // Reference to the Tyre collection
      },
    ],
  });


  const DealerStoreSchema = mongoose.model('dealerlist', DealerStore);


  
export default DealerStoreSchema;

