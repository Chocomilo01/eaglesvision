const express = require("express");
const validate = require('../middlewares/validate.middleware');
const { genAuthToken } = require("../utils/genAuthToken");
const loginSchema = require("../schema/login.schema");
const userService = require("../services/user.service");

const router = express.Router()

router.post("/", validate(loginSchema), async (req, res) => {
    const { email, password } = req.body

    const user = await userService.findOne({ email });
    if(!user) return res.status(400).send("user not registered...");
    
    const checkPassword = await user.matchPassword(password)
    if (!checkPassword) return res.status(400).json({ message: "Incorrect Password" });

    const token = genAuthToken({ _id: user._id, roles: user.roles });

    res.status(200).json({
        message: "Login Successful",
        data: { user, token },
        success: true
    });
});
 
module.exports = router;