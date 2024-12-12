
import express from "express";

import Customer from "../Models/customermodel.js";



const AddressBook = async (req , res)=>{
  try {
    // Destructure data from the request body
    const {
      firstName,
      lastName,
      company,
      phoneNumber,
      city,
      state,
      zip,
      country
    } = req.body;

    // Create a new customer document
    const newCustomer = new Customer({
      firstName,
      lastName,
      company,
      phoneNumber,
      city,
      state,
      zip,
      country
    });

    // Save the customer to the database
    await newCustomer.save();

    // Send a success response
    res.status(201).json({
      message: 'Customer added successfully!',
      customer: newCustomer
    });
  } catch (error) {
    // Handle errors (e.g., validation errors)
    console.error(error);
    res.status(500).json({
      message: 'Error adding customer',
      error: error.message
    });
  }
}


const getAddressBook = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.query.email }); // Replace with actual user identification logic
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



export {AddressBook , getAddressBook }