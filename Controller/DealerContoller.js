import dealerloginModel from "../Models/DealerLogin.js";
import Dealer from "../Models/DealerModel.js";



const addDealaer = async (req,res)=>{

  try {
    const { name, contactpersonname, contactNumber, mobileNumber, address, emailId, password, pincode, city, state, tyreBrand } = req.body;

    // Ensure tyreBrand is an array
    const tyreBrands = Array.isArray(tyreBrand) ? tyreBrand : [tyreBrand];

    // Create a new dealer
    const newDealer = new Dealer({
      name,
      contactpersonname,
      contactNumber,
      mobileNumber,
      address,
      emailId,
      pincode,
      password,
      city,
      state,
      tyreBrand: tyreBrands
    });

    // Save the dealer to the database
    await newDealer.save();

    // Respond with success
    res.status(201).json({
      message: 'Dealer added successfully',
      dealer: newDealer
    });
  } catch (error) {
    // Respond with error
    res.status(400).json({
      message: 'Error adding dealer',
      error: error.message
    });
  }

};



const GetDealer = async (req,res)=>{

    try {
        const dealers = await Dealer.find();
        res.status(200).json(dealers);
      } catch (error) {
        res.status(400).json({
          message: 'Error fetching dealers',
          error: error.message
        });
      }
}


const deleteDealer = async (req,res)=>{
    try {
        const { id } = req.params;
        
        // Find and delete the dealer by ID
        const dealer = await Dealer.findByIdAndDelete(id);
        
        if (!dealer) {
          return res.status(404).json({ message: 'Dealer not found' });
        }
        
        res.status(200).json({ message: 'Dealer deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

const UpdateDealer = async (req,res)=>{
  const { id } = req.params;
  const { name, contactPersonName, mobileNumber, emailId, pincode, city, state, tyreBrand } = req.body;

  try {
    // Find the existing dealer
    const existingDealer = await Dealer.findById(id);

    if (!existingDealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    // Update the dealer information
    const updatedDealer = await Dealer.findByIdAndUpdate(
      id,
      { 
        name, 
        contactPersonName, 
        mobileNumber, 
        emailId, 
        pincode, 
        password,
        city, 
        state, 
        tyreBrand, 
       
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: 'Dealer updated successfully', updatedDealer });
  } catch (error) {
    console.error('Error updating dealer:', error);
    res.status(500).json({ error: 'Failed to update dealer' });
  }
};



const EditDealer = async (req,res)=>{
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }
    res.json(dealer);
  } catch (error) {
    console.error('Error fetching dealer:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}


const ActiveDealer = async (req,res)=>{

  try {
    const { id } = req.params;
    const { active } = req.body;

    const dealer = await Dealer.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update active status' });
  }

}


const addDealerLogin = async (req,res)=>{

 
  const { email, password } = req.body;

// Define your fixed email and password
const yourFixedEmail = "dealer@gmail.com"; // Set your fixed email here
const yourFixedPassword = "dealer123"; // Set your fixed password here

if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
}

try {
    // Check if the provided email and password match the fixed values
    if (email === yourFixedEmail && password === yourFixedPassword) {
        return res.status(200).json({ message: 'Login successful', email });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
}

}


export {
    addDealaer,
    GetDealer,
    deleteDealer,
    UpdateDealer,
    EditDealer,
    ActiveDealer,
    addDealerLogin
}