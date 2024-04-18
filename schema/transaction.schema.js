const Joi = require('joi');

const paymentSchema = Joi.object({
    customerId: Joi.string().required(), // Assuming customerId is a string. Adjust type as necessary.
    amount: Joi.number().positive().required(), // Assuming amount is a positive number.
    description: Joi.string().allow('').optional(), // Description is an optional string.
    collectedBy: Joi.string().required(), // Assuming collectedBy is a string.
    uploadedBy: Joi.string(), //Assuming uploadedBy is a string
    modeOfPayment: Joi.string().valid('cash', 'credit_card', 'debit_card', 'online', 'transfer').required(), // Enum for mode of payment.
    paymentDate: Joi.date().iso().required(),
    name: Joi.string()
    // paymentDate: Joi.string().required() // Assuming paymentDate is an ISO date string.
});

module.exports = paymentSchema;