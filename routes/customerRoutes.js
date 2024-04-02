const express = require('express');
const router = express.Router();

const { adminAuthorizer, authenticate, admin_managerAuthorizer }  = require('../middlewares/authentication');
const customerController = require('../controller/customerController');
const validate = require('../middlewares/validate.middleware');
const customerSchema = require('../schema/customer.schema');


router.post('/', validate(customerSchema), customerController.createCustomer) // role : manager, DPO
router.get('/', customerController.fetchCustomers) // Role : dpo
router.get('/search', customerController.searchCustomers); // role: user
router.get('/:id', customerController.fetchOneCustomer) // Everybodyz
router.patch('/:id', admin_managerAuthorizer, adminAuthorizer, customerController.updateCustomer)
router.delete('/:id', adminAuthorizer, customerController.deleteCustomer)
router.get("/:customerId/transactions", customerController.getCustomerTransactions);
//router.get("/:customerId/savings-transactions", customerController.getSavingsTransactions);


 module.exports = router;