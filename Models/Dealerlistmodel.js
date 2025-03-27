import mongoose from 'mongoose';

const DealerList = new mongoose.Schema({
  
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


  const DealerListSchema = mongoose.model('dealerlist', DealerList);

export default DealerListSchema;

