import mongoose from "mongoose";

const DealerPriceSchema = new mongoose.Schema({
  clientId: { type: String, required: true }, // Reference to dealer
  tyreId: { type: String, required: true }, // Tyre ID
  price: { type: Number, required: true } // Dealer's custom price
});

const DealerPriceModel = mongoose.model("DealerPrice", DealerPriceSchema);

export default DealerPriceModel;


