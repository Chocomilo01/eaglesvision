const bcrypt = require("bcryptjs");
const express = require("express");
const { User } = require("../model/userModel");
const { authenticate, adminAuthorizer, admin_managerAuthorizer } = require('../middlewares/authentication');
const validate = require("../middlewares/validate.middleware");
const registerSchema = require("../schema/user.schema");
const { registerUser,
        getByID, 
        deleteUser, 
        getAllUsers, 
        loginUser } = require("../controller/user.controller");
const loginSchema = require("../schema/login.schema");



const router = express.Router()

// router.post("/register", authenticate, admin_managerAuthorizer, validate(registerSchema), registerUser)
router.post("/register", validate(registerSchema), registerUser)
router.post("/login", validate(loginSchema), loginUser)
router.get("/", authenticate, getAllUsers)
router.get("/:id", authenticate, getByID)
router.delete("/:id", authenticate, adminAuthorizer, deleteUser)
  
// Add a new route for changing passwords
router.post("/change-password", authenticate, async (req, res) => {
  try {
   
    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

 module.exports = router;