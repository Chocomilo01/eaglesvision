// const express = require('express');
// const router = express.Router();

// const { adminAuthorizer, authenticate }  = require('../middlewares/authentication');
// const userController = require('../controller/userController');


// router.post('/', userController.createUser)
//  router.get('/:id', userController.fetchOneUser)
//  router.patch('/:id', userController.updateUser)
//  router.get('/', userController.fetchUsers)
//  router.delete('/:id', userController.deleteUser)



//  module.exports = router;


const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../model/userModel");
const { Authenticate } = require('../middlewares/authentication');
const genAuthToken = require("../utils/genAuthToken");



const router = express.Router()

router.post("/", async (req, res) => {

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

})

// router.get("/find/:id", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       res.status(200).send(user);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });
  
 module.exports = router;