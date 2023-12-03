const userService = require("../services/user.service")
const { genAuthToken } = require("../utils/genAuthToken");

exports.registerUser = async (req, res) => {
    // This Endpoint Registers A User.
    try {
        // Check if the user already exists
        let userEmail = await userService.findOne({ email: req.body.email });
        let userBVN = await userService.findOne({ bvn: req.body.bvn });

        if (userEmail || userBVN) {
            return res.status(400).json({
                success: false,
                message: "user credentials already exists.",
            });
        }

        // Create a new user
        const userSaved = await userService.createUser({...req.body})

        // Generate JWT token
        const token = genAuthToken({_id: userSaved._id, roles: userSaved.roles});

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Registered successfully",
            data: { userSaved, token },
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};

exports.getByID = async (req, res) => {
    // This Endpoint Gets A User By ID
    
    const userId = req.params.id;
    
    // Check if the user ID is valid (e.g., it's in the correct format)
    userService.isValidMongooseId(userId)
    
    // Find the user by ID
    try {
        const user = await userService.findById(userId);
    
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
        message: `Internal server error: ${error.message}`,
    });
    }
};

exports.getAllUsers = async (req, res) => {
    // This Endpoint Gets All Users
    try {
        const users = await userService.getAll();
  
        res.status(200).json({
            success: true,
            message: "Users Fetched Successfully",
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};

exports.deleteUser = async (req, res) => {
    // This Endpoint Deletes A Users By ID
    const userId = req.params.id;
  
    // Check if the user ID is valid (e.g., it's in the correct format)
    userService.isValidMongooseId(userId)
  
    // Delete the user by ID
    try {
        const deletedUser = await userService.findByIdAndDelete(userId);
    
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
  
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: deletedUser
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};