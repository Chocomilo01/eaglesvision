const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    roles: Joi.string(),
});

module.exports = loginSchema