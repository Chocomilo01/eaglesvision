const bcrypt = require("bcryptjs");
const Joi = require("joi");
const express = require("express");
const { User } = require("../model/userModel");
const { Authenticate } = require('../middlewares/authentication');
const genAuthToken = require("../utils/genAuthToken");



const router = express.Router()

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      middleName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
      roles: Joi.string(),
      phone: Joi.string().required(),
      sex: Joi.string().required(),
      bvn: Joi.string().required(),
      homeAddress: Joi.string().required(),
      passport: Joi.string(),
      status: Joi.string(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check if the user already exists
    let user = await User.findOne({ email: req.body.email }).select('-password');

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = new User({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      roles: req.body.roles,
      phone: req.body.phone,
      sex: req.body.sex,
      bvn: req.body.bvn,
      homeAddress: req.body.homeAddress,
      passport: req.body.passport,
      status: req.body.status,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = genAuthToken(user);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Registered successfully",
      data: { user, token },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
  
    // Check if the user ID is valid (e.g., it's in the correct format)
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
  
    // Find the user by ID
    try {
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User Found Successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Add this route to your existing router
router.get("/", async (req, res) => {
    try {
      const users = await User.find().select("-password");
  
      res.status(200).json({
        success: true,
        message: "Users Fetched Successfully",
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Add this route to your existing router
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
  
    // Check if the user ID is valid (e.g., it's in the correct format)
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
  
    // Delete the user by ID
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        data: deletedUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  
 module.exports = router;