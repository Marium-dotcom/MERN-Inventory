const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
  
  // Register User
  const registerUser = asyncHandler(async (req, res) => 
  {
    const { name, email, password } = req.body;
  
    // Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }
  
    // Check if user email already exists
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  
    //   Generate Token
    const token = generateToken(user._id);


  
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  
    if (user) {
      const { _id, name, email, photo, phone, bio, password } = user;
      res.status(201).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token,
        password
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });
  


 const loginUser = asyncHandler(
  async(req, res) => {
const {email, password} = req.body
if(!email || !password){
  res.status(400)
  throw new Error("Please fill all the requirements")
}

// check if user exists

const user = await User.findOne({email})
if(!user){
  res.status(400)
  throw new Error("User doesn't exist")
}


//user exists

const passwordIsCorrect = await bcrypt.compare(password, user.password)

if(passwordIsCorrect){
// Generate Token
const token = generateToken(user.id) 

// Send HTTP-only cookie

  res.cookie("token", token, {
  path: "/",
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 86400), // 1 day
  sameSite: "none",
  secure: true,
});
}

if(user && passwordIsCorrect){
  const { _id, name, email, photo, phone, bio, password, token } = user;
  res.status(200).json({
    _id,
    name,
    email,
    photo,
    phone,
    bio,
    token,
    password

  });

}else{
  res.status(400)
  throw new Error("err err")
}
  }


 )


  module.exports = {registerUser, loginUser};