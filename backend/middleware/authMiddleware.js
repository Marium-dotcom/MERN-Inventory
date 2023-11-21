const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async(req,res, next)=>{

    try {
        const token = req.cookies.token
        if (!token){
            res.status(401)
            throw new Error("Please login")
        }

        //token verification
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(verified);
        const user = await User.findById(verified.id).select("-password")
        // console.log(user + " authenticated");
        if (!user){
            res.status(401)
            throw new Error("user not found")
        }

        req.user = user
        // console.log("req.user"+ req.user);
        // console.log("req"+ req);

        
next()

    } catch (error) {
        throw new Error(error)
    }

})


module.exports = authMiddleware