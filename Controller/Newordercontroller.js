import express from 'express';
import Order from '../Models/Newordermodel.js';
import mongoose from 'mongoose';
import frontlogin from "../Models/FrontendLoginModel.js";
import Businessmodel from '../Models/BusinessDetails.js';


// Create a new order


const createOrder = async (req, res) => {
  try {
    console.log("Received Order Request:", req.body);

    const { customerId, items, totalAmount, paymentMethod } = req.body;

    // Validate required fields
    if (!customerId || !items || !totalAmount || !paymentMethod) {
      console.error("Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch customer details
    const customer = await frontlogin.findOne({ email: customerId });
    if (!customer) {
      console.error("Customer not found in database");
      return res.status(404).json({ message: "Customer not found" });
    }

    // Process order items
    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Businessmodel.findById(item.productId);

        return {
          productId: item.productId,
          title: item.title || (product?.title || "Unknown Product"),
          image: item.image || (product?.image || "http://localhost:8000/uploads/default-image.jpg"),
          price: item.price,
          quantity: item.quantity,
          deliveryType: item.deliveryType,
          leastTime: item.leastTime,
          ...(item.deliveryType === "Get Fitted" ? { clientId: item.clientId } : {}), // ✅ Include clientId only if deliveryType is "Get Fitted"
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
      },
    });

    await newOrder.save();
    console.log("New Order Created:", newOrder); // Log the new order

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






 

const getAllOrders = async (req, res) => {
  try {
    const { clientId } = req.query; // Get clientId from query parameters
    if (!clientId) {
      return res.status(400).json({ message: "Client ID is required" });
    }

    console.log("Fetching orders for clientId:", clientId);

    // Fetch orders only for the dealer with the provided clientId
    const orders = await Order.find({ "items.clientId": clientId })
      .populate("customer", "name email")
      .populate("items.productId", "title image");

    console.log("Fetched Orders:", orders);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





const getTotalAmountPerDealer = async (req, res) => {
  try {
    // Aggregate total amounts and orders per dealer excluding cancelled/rejected orders
    const totalAmounts = await Order.aggregate([
      { $unwind: "$items" }, // Flatten items array
      {
        $match: {
          status: { $nin: ["Cancelled", "Rejected"] }, // Exclude cancelled and rejected orders
        },
      },
      {
        $group: {
          _id: "$items.clientId", // Group by dealer (clientId)
          totalAmount: { $sum: "$totalAmount" }, // Sum total amounts
          totalOrders: { $sum: 1 }, // Count valid orders
        },
      },
    ]);

    // Get total order count (excluding cancelled/rejected)
    const totalOrdersCount = await Order.countDocuments({
      status: { $nin: ["Cancelled", "Rejected"] },
    });

    // Get total revenue across all orders
    const totalAmountSum = await Order.aggregate([
      {
        $match: {
          status: { $nin: ["Cancelled", "Rejected"] },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalAmount = totalAmountSum[0] ? totalAmountSum[0].totalAmount : 0;

    res.status(200).json({
      success: true,
      totalAmounts,
      totalOrders: totalOrdersCount,
      totalAmount,
    });
  } catch (error) {
    console.error("Error fetching total amounts per dealer:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




const getTotalAmountByClientId = async (req, res) => {
  try {
    const { clientId } = req.params; // Extract clientId from request parameters

    if (!clientId) {
      return res.status(400).json({ success: false, message: "Client ID is required" });
    }

    // Aggregate total amounts and orders for a specific client (dealer), excluding cancelled/rejected orders
    const totalAmounts = await Order.aggregate([
      { $unwind: "$items" }, // Flatten items array
      {
        $match: {
          "items.clientId": clientId, // Filter orders by clientId
          status: { $nin: ["Cancelled", "Rejected"] }, // Exclude cancelled and rejected orders
        },
      },
      {
        $group: {
          _id: "$items.clientId", // Group by clientId
          totalAmount: { $sum: "$totalAmount" }, // Sum total amounts
          totalOrders: { $sum: 1 }, // Count valid orders
        },
      },
    ]);

    if (totalAmounts.length === 0) {
      return res.status(404).json({ success: false, message: "No sales data found for this client" });
    }

    res.status(200).json({
      success: true,
      totalAmounts: totalAmounts[0], // Return the aggregated data for the client
    });
  } catch (error) {
    console.error("Error fetching total amounts for client:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





const getHomeDeliveryOrders = async (req, res) => {
  try {
  

    // Fetch orders with deliveryType "Home Delivery"
    const homeDeliveryOrders = await Order.find({ "items.deliveryType": "Home Delivery" })
      .populate("customer", "name email")
      .populate("items.productId", "title image");

    console.log("Fetched Home Delivery Orders:", homeDeliveryOrders);
    res.json(homeDeliveryOrders);
  } catch (error) {
    console.error("Error fetching home delivery orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



  
// Cancel order by ID
const CancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const clientId = req.body.clientId; // Get clientId from request body

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // ✅ Ensure `order.clientId` exists before calling `toString()`
    if (!order.items || order.items.length === 0) {
      return res.status(400).json({ success: false, message: "Order has no items" });
    }

    // Extract clientId from the first item (assuming all items belong to the same client)
    const orderClientId = order.items[0].clientId;

    if (!orderClientId) {
      return res.status(400).json({ success: false, message: "Client ID missing in order" });
    }

    // Check if the order belongs to the requesting client
    if (orderClientId.toString() !== clientId) {
      return res.status(403).json({ success: false, message: "Unauthorized to cancel this order" });
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
      .populate("customer", "name email") // ✅ Populates only customer details
      .populate("items.productId", "title image"); // ✅ Populates product details

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      ...order.toObject(),
      items: order.items.map(item => ({
        productId: item.productId?._id || item.productId, // Ensure productId is returned
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        deliveryType: item.deliveryType, // ✅ Already exists, no need for populate
        leastTime: item.leastTime // ✅ Already exists, no need for populate
      }))
    });

  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



  const getcancelhistory = async (req, res) => {
    try {
      const clientId = req.query.clientId; 
  
      if (!clientId) {
        return res.status(400).json({ success: false, message: "Client ID is required" });
      }
  
      // Fetch canceled orders for the given clientId
      const canceledOrders = await Order.find({
        status: "Cancelled",
        "items.clientId": clientId,  // ✅ Correct way to query nested fields
      }).populate("customer", "name email")
        .populate("items.productId", "title image");
      
      console.log("🛠️ Debug: Fetched Canceled Orders for Client ID:", clientId, canceledOrders);
  
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


  const rejectorder = async (req,res) => {
    try {
      const { orderId } = req.params;
  
      // Find the order by ID and update its status to "Rejected"
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: "Rejected" },
        { new: true } // Returns the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      res.json({ success: true, message: "Order rejected successfully", order: updatedOrder });
    } catch (error) {
      console.error("Error rejecting order:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }


  const status = async (req, res) => {
   try {
    const { orderId } = req.params;
    const { status, completedDate } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, 
      { status, completedDate }, 
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
  };


// GET /orders/customer/:id
const getOrdersByCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ customer: id })
      .populate("customer", "name email")
      .populate("items.productId", "title image");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by customer ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




  export {createOrder,getAllOrders,CancelOrder, getOrderById , getcancelhistory , getcustomer , rejectorder , status ,
  getHomeDeliveryOrders , getTotalAmountPerDealer , getTotalAmountByClientId , getOrdersByCustomer

  }