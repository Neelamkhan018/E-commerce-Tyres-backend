import mongoose from "mongoose";

const DeliveryOptionSchema = new mongoose.Schema({
  tyreId: { type: mongoose.Schema.Types.ObjectId, ref: "DealerPrice", required: true },
  deliveryType: { type: String, enum: ["Home Delivery", "Get Fitted"], required: true },
  leastTime: { type: String, required: true },
});

const DeliveryOption = mongoose.model("Delivery", DeliveryOptionSchema);

export default DeliveryOption;

