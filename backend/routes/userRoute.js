const express = require("express");
const router = express.Router();

const {registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword,resetPassword}  = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout)
router.get("/getUser",authMiddleware, getUser)
router.get("/loginStatus", loginStatus)
router.patch("/updateUser", authMiddleware ,updateUser)
router.patch("/changePassword", authMiddleware ,changePassword)
router.post("/forgotPassword", forgotPassword)
router.put("/resetPassword/:resetToken", resetPassword)
module.exports = router;