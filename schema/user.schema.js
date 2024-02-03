const Joi = require("joi");

const registerSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    middleName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    roles: Joi.string(),
    phone: Joi.string().required(),
    sex: Joi.string(),
    bvn: Joi.string().required(),
    homeAddress: Joi.string().required(),
    passport: Joi.string(),
    status: Joi.string(),
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().min(6).max(200).required(),
    newPassword: Joi.string().min(6).max(200).required(),
});

module.exports = registerSchema, changePasswordSchema