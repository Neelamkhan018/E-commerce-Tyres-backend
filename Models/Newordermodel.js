import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
    default: () => Math.floor(1000 + Math.random() * 9000).toString(), // Generates a 4-digit orderId
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "frontuser",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Businessmodeluser" },
      title: { type: String, required: true },
      image: { type: String, required: false },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      deliveryType: { type: String, enum: ["Home Delivery", "Get Fitted"], required: true }, // ✅ Added delivery type
      leastTime: { type: String, required: true }  // ✅ Added least time
    },
  ],
  totalAmount: { type: Number, required: true },
  payment: {
    method: { type: String, required: true, enum: ["COD", "Online"] },
    transactionId: { type: String, default: null },
  },
  status: {
    type: String,
    enum: ["Completed", "Processing", "Cancelled", "Rejected"],
    default: "Processing",
  },  

  completedDate: { type: Date, default: null }, // Add this line

  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
