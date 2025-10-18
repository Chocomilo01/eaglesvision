const bcrypt = require("bcryptjs");
const express = require("express");
const userService = require("../services/user.service"); // Use your service
const { authenticate, adminAuthorizer, admin_managerAuthorizer } = require('../middlewares/authentication');
const validate = require("../middlewares/validate.middleware");
const registerSchema = require("../schema/user.schema");
const { registerUser, getByID, deleteUser, getAllUsers, loginUser } = require("../controller/user.controller");
const loginSchema = require("../schema/login.schema");

const router = express.Router();

router.post("/register", authenticate, adminAuthorizer, validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getByID);
router.delete("/:id", authenticate, adminAuthorizer, deleteUser);

// Change password route using userService
router.post("/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    // Find the user by ID using userService
    const user = await userService.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify the current password using the model method
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Check if new password is different from current password
    const isSamePassword = await user.matchPassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    // Update password using userService
    const updatedUser = await userService.update(req.user._id, {
      password: newPassword // Let the model pre-save hook handle hashing
    });

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