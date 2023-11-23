const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail")
const Token = require("../models/tokenModel")

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
  
//login user

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
  throw new Error("Incorrect password")
}
  }


 )

//logout 

const logout = asyncHandler(async(req, res)=>{
  
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  })
  return res.status(200).json({message: "logged out successfully"})
})


//get user

const getUser = asyncHandler(async(req, res)=>{
  
const user = await User.findById(req.user._id)

if(user){
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
 
}

})

const loginStatus = asyncHandler(async(req, res)=>{
  const token = req.cookies.token;
  if(!token){
    return res.json(false)
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET)

  // console.log(verified);

  if(verified){
    return res.json(true)
  }

  return res.json(false)

});


//update user


const updateUser = asyncHandler(async(req, res)=>{

  const user = await User.findById(req.user._id)

  if(user){
    const {  name, email, photo, phone, bio } = user;
user.email = email;
user.name = req.body.name || name;
user.phone = req.body.phone || phone
user.bio = req.body.bio || bio
user.photo = req.body.photo || photo

const updateUser = await user.save()

    res.json({
      name: updateUser.name,
      email: updateUser.email,
      photo: updateUser.photo,
      phone: updateUser.phone,
      bio: updateUser.bio,
      _id : updateUser._id
  
    });
  
  }
  else{
    res.status(404)
    throw new Error("User not found")
  }
});



//change password

const changePassword = asyncHandler(async(req, res, next)=>{
  const user = await User.findById(req.user._id)
 const {oldPassword, newPassword} = req.body;
// console.log(oldPassword, newPassword + "test password changed") ;
 if(!oldPassword || !newPassword){
res.status(400)
throw new Error("Please add old and new Password")
 }
 if(!user){
  res.status(400)
  throw new Error("user not found")
  
 }
//check if password matches new password

const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)
const hashedNewPassword = await bcrypt.hash(newPassword, 10); // 10 is the number of salt rounds

if(user && passwordIsCorrect){
  user.password = hashedNewPassword
  await user.save()
  res.status(200).send("Password changed successfully") 
}
else {
  res.status(400).send("Old password is incorrect")
}

})






//Forgot password



const forgotPassword = asyncHandler(async(req, res)=>{

const {email} = req.body
// console.log("email" + email);

const user = await User.findOne({email})
// console.log(user);
if(!user){
  res.status(404)
  throw new Error("User does not exist")
}

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }


// reset password token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id
  console.log("reset token"+resetToken);
//hash token 
const hashToken = crypto.createHash("sha256").update(resetToken).digest("hex")
// console.log(hashToken);

//save token to db
//token Model
await new Token({
  userId: user._id,
  token: hashToken,
  createAt: Date.now(),
  expireAt: Date.now() + 30 * (60*1000) // 30 mins
}).save()


//reset url

const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}` 

// reset email

const message = `

<h2> Dear ${user.name}</h2>,

<p> To reset your password, click here: <a href=${resetURL} clicktracking=off> ${resetURL} </a> </p>

<p> Best,
<b> StockPulse </b> </p>
`


const subject = "Password Reset Instructions"
const send_to = user.email
const sent_from = process.env.EMAIL_USER


try {
  await sendEmail(subject, message,sent_from, send_to)
  res.status(200).json({success: true, message: "Password Reset Instructions is Successful"})

} catch (error) {
  res.status(500)
  throw new Error("Email not sent, Please try again")
};




})


//reset password

const resetPassword = asyncHandler(async(req, res, next)=>{

  const {password} = req.body
  console.log("body"+req.body);
  const {resetToken} = req.params
  console.log("resettoken"+resetToken);
//hash token 
const hashToken = crypto.createHash("sha256").update(resetToken).digest("hex")

//find token in db
const userToken = await Token.findOne({
  token: hashToken,
  expireAt: {$gt: Date.now()},
}) 
if (!userToken){
  res.status(404)
  throw new Error("Expired token")
}
const hashedNewPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds


//find user 
const user = await User.findOne({_id: userToken.userId})
user.password = hashedNewPassword
await user.save();
res.status(200).json({
  message: "Password Reset Successful, Please Login",
});

})


  module.exports = {registerUser, loginUser,logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword};