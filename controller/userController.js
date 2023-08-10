const UserService = require("../services/userService");
const bcrypt = require("bcrypt");
const Joi = require("joi");
// const express = require("express");
const { User } = require("../model/userModel");
const {authenticate} = require('../middlewares/authentication');
const genAuthToken = require("../utils/genAuthToken");



// const router = express.Router()


class UserController {
   async createUser(req, res) {

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(), 
    middleName: Joi.string().min(3).max(30).required(), 
    lastName: Joi.string().min(3).max(30).required(), 
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
      roles: Joi.string().required(),
      phone: Joi.string().required(),
      sex: Joi.string().required(),
      bvn: Joi.string().required(),
      homeAddress: Joi.string().required(),
      passport: Joi.string(),
      status: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);

  if(error) return res.status(400).send(error.details[0].message);
  //check if user already exist
  let user = await User.findOne({ email: req.body.email }).select('-password');

  if(user) return res.status(400).send("User already exist..");

  user = new User({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles,
      phone: req.body.phone,
      sex: req.body.sex,
      bvn: req.body.bvn,
      homeAddress: req.body.homeAddress,
      passport: req.body.passport,
      status: req.body.status,
  });
  
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  
  user = await user.save()

  const token = genAuthToken(user)

  res
  .status(200)
  .json({
  message: "Registered Successfully",
  data: { user, token },
  success: true,
});
}
async updateUser(req, res) {
      const updateData = req.body;
      const userId = req.params.Id;
  
      // fetch the user wth the Id
  
      const existingUser = await UserService.fetchOne({ _id: userId });
      if (!existingUser)
        res.status(403).json({
          success: false,
          message: "user not found",
        });
      if (updateData.name) {
        const existingUserWithUpdateName = await UserService.fetchOne({
          name: updateData.name.toLowerCase(),
        });
        if (existingUserWithUpdateName._id.toString() !== userId) {
          return res.status(403).json({
            success: false,
            message: "User with that ttle already exist",
          });
        }
      }
      const updatedData = await UserService.update(userId, updateData);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedData,
      });
    }
    async fetchUsers(req, res) {
          const allUsers = await UserService.fetch({});
          return res.status(200).json({
            success: true,
            message: "User successfully fetched",
            data: allUsers,
          });
        }
        async fetchOneUser(req, res) {
          const userId = req.params.Id;
          const userToFetch = await UserService.fetchOne({ _id: userId });
          if (!userToFetch)
            return res.status(403).json({
              success: false,
              message: "User not Found",
            });
      
          res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            data: userToFetch,
          });
        }
      
    async deleteUser(req, res) {
          const userId = req.params.id;
          const userToFetch = await UserService.fetchOne({ _id: userId });
      
          if (!userToFetch)
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
      
          const deletedUser = await UserService.delete(formId);
          return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: deletedUser,
          });
        }
}
module.exports = new UserController();
