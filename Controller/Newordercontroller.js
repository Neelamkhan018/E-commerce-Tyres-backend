import express from 'express';
import Order from '../Models/Newordermodel.js';
import mongoose from 'mongoose';
import frontlogin from "../Models/FrontendLoginModel.js";
import Businessmodel from '../Models/BusinessDetails.js';


// Create a new order
const createOrder = async (req, res) => {
  try {
      console.log(" Received Order Request:", req.body);

      const { customerId, items, totalAmount, paymentMethod, transactionId } = req.body;

      if (!customerId || !items || !totalAmount || !paymentMethod) {
          console.error(" Missing required fields");
          return res.status(400).json({ message: "Missing required fields" });
      }

      console.log("🔍 Fetching customer details for Email:", customerId);
      const customer = await frontlogin.findOne({ email: customerId });

      if (!customer) {
          console.error(" Customer not found in database");
          return res.status(404).json({ message: "Customer not found" });
      }

      console.log("Customer found:", customer);

      // Fetch product details and ensure title & image are stored
      const populatedItems = await Promise.all(
          items.map(async (item) => {
              const product = await Businessmodel.findById(item.productId);

              if (!product) {
                  console.warn(` Product not found for ID: ${item.productId}`);
              }

              return {
                  productId: item.productId,
                  title: item.title || (product ? product.title : "Unknown Product"),
                  image: item.image || (product ? product.image : "http://localhost:8000/uploads/default-image.jpg"), // Preserve frontend image
                  price: item.price,
                  quantity: item.quantity,
              };
          })
      );

      // Create and save order
      const newOrder = new Order({
          customer: customer._id,
          items: populatedItems,
          totalAmount,
          payment: {
              method: paymentMethod,
              transactionId: transactionId || null,
          },
      });

      console.log("Saving new order:", newOrder);
      await newOrder.save();

      console.log("Order saved successfully:", newOrder);

      res.status(201).json({
          message: "Order created successfully",
          order: newOrder,
          customerDetails: {
              name: customer.name,
              email: customer.email,
          },
      });

  } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





//get orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
          .populate("customer", "name email") // Populate customer details
          .populate("items.productId", "title image"); // Populate product details
          
    
        res.json(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
      }
  };
  



  
// Cancel order by ID
const CancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update order status to "Cancelled"
    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }

};

  
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id)
      .populate("customer", "name email")
      .populate("items.productId", "title image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  const getcancelhistory = async (req, res) => {
    try {
      // Fetch canceled orders and populate customer details (name and email)
      const canceledOrders = await Order.find({ status: "Cancelled" })
        .populate("customer", "name email") // Populate customer details
        .populate("items.productId", "title image"); // Populate product details for items
  
      res.json(canceledOrders);
    } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  const getcustomer = async(req , res) =>{
    try {
      const order = await Order.findById(req.params.id)
        .populate({
          path: 'customer',
          select: 'email name lastname mobilenumber address city state pincode', // Add the fields you want to populate
        })
        .populate('items.productId', 'title price image'); // Populate product details for each item
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Return the populated order details
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  export {createOrder,getAllOrders,CancelOrder, getOrderById , getcancelhistory , getcustomer}