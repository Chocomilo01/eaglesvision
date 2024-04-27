const Joi = require("joi");

const customerSchema = Joi.object({
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),
    sex: Joi.string().valid('male', 'female', 'other'),
    bvn: Joi.string().pattern(/^[0-9]+$/).min(10).max(11),
    homeAddress: Joi.string().min(3).max(300),
    picture: Joi.string(),
    maritalStatus: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed'),
    contactAddress: Joi.string().min(3).max(200),
    nextOfKin: Joi.string().min(3).max(100),
    nextOfKinPhone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),
    bankAccountNo: Joi.string().pattern(/^[0-9]+$/).min(10).max(20),
    bankAccountName: Joi.string().min(3).max(100),
    bankName: Joi.string().min(3).max(50),
    customersPhoneNo: Joi.string().pattern(/^[0-9]+$/).min(8).max(11),
    dateOfBirth: Joi.date(),
    placeOfBirth: Joi.string().min(3).max(100),
    occupation: Joi.string().min(3).max(100),
    name: Joi.string().min(3).max(100).required(),
    officerIncharge: Joi.string().required(),
    uploadedBy: Joi.string(),
});

module.exports = customerSchema