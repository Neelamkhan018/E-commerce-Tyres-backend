
import express from "express";

import BillingAddress from "../Models/BillingAddressmodel.js";
import ShippingAddress from "../Models/ShippingAddressmodel.js";



const AddressBook = async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      firstName,
      lastName,
      streetAddress,
      townOrCity,
      state,
      pincode
    } = req.body;

    // Create a new billing address document
    const newAddress = new BillingAddress({
      firstName,
      lastName,
      streetAddress,
      townOrCity,
      state,
      pincode
    });

    // Save the address to the database
    await newAddress.save();

    // Send a success response
    res.status(201).json({
      message: 'Billing address added successfully!',
      address: newAddress
    });
  } catch (error) {
    // Handle errors (e.g., validation errors)
    console.error(error);
    res.status(500).json({
      message: 'Error adding billing address',
      error: error.message
    });
  }
};


const shipping = async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      firstName,
      lastName,
      streetAddress,
      townOrCity,
      state,
      pincode
    } = req.body;

    // Create a new billing address document
    const newAddress = new ShippingAddress({
      firstName,
      lastName,
      streetAddress,
      townOrCity,
      state,
      pincode
    });

    // Save the address to the database
    await newAddress.save();

    // Send a success response
    res.status(201).json({
      message: 'Shipping address added successfully!',
      address: newAddress
    });
  } catch (error) {
    // Handle errors (e.g., validation errors)
    console.error(error);
    res.status(500).json({
      message: 'Error adding Shipping address',
      error: error.message
    });
  }
};


const getAddressBook = async (req, res) => {
  try {
    const customer = await BillingAddress.findOne({ email: req.query.email }); // Replace with actual user identification logic
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      customerAddresses: customer.addresses, // Assuming addresses is an array field in your customer model
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching address book", error: error.message });
  }
};






export {AddressBook , getAddressBook , shipping }
