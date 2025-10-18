const userModel = require("../model/userModel")
const mongoose = require("mongoose")

class userService {
    // register a user model
    async createUser(user) {
        return await userModel.create(user)
    }

    // Edit a user - FIXED to handle password hashing
    async update(id, userData) {
        if (userData.password) {
            // If updating password, we need to use findById + save to trigger pre('save') middleware
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            
            // Update user fields
            Object.keys(userData).forEach(key => {
                user[key] = userData[key];
            });
            
            // This will trigger the pre('save') middleware and hash the password
            return await user.save();
        } else {
            // For non-password updates, use findByIdAndUpdate
            return await userModel.findByIdAndUpdate(id, userData, { 
                new: true
            });
        }
    }

    // Delete a user
    async delete(filter){
        return await userModel.findByIdAndDelete(filter)
    }

    // find a user by their id
    async findOne(filter){
        return await userModel.findOne(filter)
    } 

    // find a user by their id
    async findById(id){
        return await userModel.findById(id)
    } 

    // Get all users 
    async getAll(filter) {
        return await userModel.find(filter)
    }

    isValidMongooseId(idToCheck) {
        if (mongoose.Types.ObjectId.isValid(idToCheck)) {
            return true
        } else {
            // Return an error response if the id is invalid
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
            });
        }
    }
}

module.exports = new userService()