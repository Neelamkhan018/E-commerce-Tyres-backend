
import BillingAddress from "../Models/BillingAddressmodel.js";
import ShippingAddress from "../Models/ShippingAddressmodel.js";



// Controller for adding billing address
const AddressBook = async (req, res) => {
  try {
    const { userId, firstName, lastName, streetAddress, townOrCity, state, pincode } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    // Create a new billing address document
    const newAddress = new BillingAddress({
      userId, // Add userId to associate the address with the user
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
    console.error(error);
    res.status(500).json({
      message: 'Error adding billing address',
      error: error.message
    });
  }
};


// Controller for adding shipping address
const shipping = async (req, res) => {
  try {
    const { userId, firstName, lastName, streetAddress, townOrCity, state, pincode } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    // Create a new shipping address document
    const newAddress = new ShippingAddress({
      userId, // Add userId to associate the address with the user
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
    console.error(error);
    res.status(500).json({
      message: 'Error adding shipping address',
      error: error.message
    });
  }
};




const getAddressBook = async (req, res) => {
  const { userId } = req.params; // Assuming you pass userId as a parameter in the URL

  try {
    // Fetch both billing and shipping addresses based on the userId
    const shippingAddress = await ShippingAddress.findOne({ userId });
    const billingAddress = await BillingAddress.findOne({ userId });

    if (!shippingAddress || !billingAddress) {
      return res.status(404).json({ message: "Addresses not found" });
    }

    res.status(200).json({
      shippingAddress,
      billingAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching address book", error: error.message });
  }
};







export {AddressBook , getAddressBook , shipping }
