const Joi = require("joi");

const customerSchema = Joi.object({
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    sex: Joi.string().valid('male', 'female', 'other').required(),
    bvn: Joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
    homeAddress: Joi.string().min(3).max(300).required(),
    passport: Joi.string().min(3).max(50).required(),
    maritalStatus: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').required(),
    contactAddress: Joi.string().min(3).max(200).required(),
    nextOfKin: Joi.string().min(3).max(100).required(),
    nextOfKinPhone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    bankAccountNo: Joi.string().pattern(/^[0-9]+$/).min(10).max(20).required(),
    bankAccountName: Joi.string().min(3).max(100).required(),
    bankName: Joi.string().min(3).max(50).required(),
    customersPhoneNo: Joi.string().pattern(/^[0-9]+$/).min(8).max(11).required(),
    dateOfBirth: Joi.date().required(),
    placeOfBirth: Joi.string().min(3).max(100).required(),
    occupation: Joi.string().min(3).max(100).required(),
    name: Joi.string().min(3).max(100).required(),
});

module.exports = customerSchema