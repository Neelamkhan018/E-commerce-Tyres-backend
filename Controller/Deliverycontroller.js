import express from "express";
import DeliveryOption from "../Models/Deliverymodel.js";

const selectDeliveryOption = async (req, res) => {
    try {
      const { tyreId, deliveryType, leastTime } = req.body;
  
      if (!tyreId || !deliveryType || !leastTime) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
  
      const deliveryOption = new DeliveryOption({ tyreId, deliveryType, leastTime });
  
      await deliveryOption.save();
      res.status(201).json({ message: "Delivery option saved successfully", data: deliveryOption });
    } catch (error) {
      console.error("Error saving delivery option:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message }); // Include error message
    }
  };



  



export {selectDeliveryOption }