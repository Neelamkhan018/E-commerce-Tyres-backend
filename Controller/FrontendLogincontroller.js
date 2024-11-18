import frontlogin from "../Models/FrontendLoginModel.js";




const FrontendRegister = async (req,res)=>{
    try {
        const { name, email, password } = req.body;
    
        // Check if the user already exists
        const existingUser = await frontlogin.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Create a new user
        const newUser = new frontlogin({
          name,
          email,
          password, // Storing password as plain text (not recommended for production)
        });
    
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }

}


const FrontendLogin = async (req,res)=>{
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await frontlogin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password matches (for simplicity, comparing plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
export {
    FrontendRegister,
    FrontendLogin
}