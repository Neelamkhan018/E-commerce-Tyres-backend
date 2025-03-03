import express from "express";
import DealerPriceModel from "../Models/Dealerpricemodel.js";




// **POST API: Add or Update Dealer Price**
const addDealerPrice = async (req, res) => {
  try {
    const { clientId, tyreId, price } = req.body;

    if (!clientId || !tyreId || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let dealerPrice = await DealerPriceModel.findOne({ clientId, tyreId });

    if (dealerPrice) {
      // Update existing price
      dealerPrice.price = price;
    } else {
      // Create new price entry
      dealerPrice = new DealerPriceModel({ clientId, tyreId, price });
    }

    await dealerPrice.save();
    res.status(200).json({ message: "Dealer price saved successfully", dealerPrice });

  } catch (error) {
    console.error("Error saving dealer price:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export {addDealerPrice}