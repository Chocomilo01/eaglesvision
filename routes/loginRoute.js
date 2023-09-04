const bcrypt = require("bcryptjs");
const Joi = require("joi");
const express = require("express");
const { User } = require("../model/userModel");
const authenticate = require('../middlewares/authentication');
const genAuthToken = require("../utils/genAuthToken");
const secretKey = process.env.JWT_SECRET_KEY



const router = express.Router()

router.post("/", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
        roles: Joi.string(),
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email }).select('+password');

    if(!user) return res.status(400).send("user not registered...");

    //evaluate password
    console.log(user.password)
    const isValid = await bcrypt.compare(req.body.password, user.password)

    if (!isValid) return res.status(400).send("Invalid email or password...")

    const token = genAuthToken({ userId: user._id, email: user.email, roles: user.roles }, secretKey, { expiresIn: "24h" });

    res
    .status(200)
    .json({
    message: "Login Successful",
    data: { user, token },
    success: true,
});
});
 
module.exports = router;