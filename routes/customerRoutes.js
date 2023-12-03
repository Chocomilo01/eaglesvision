const express = require('express');
const router = express.Router();

const { adminAuthorizer, authenticate }  = require('../middlewares/authentication');
const customerController = require('../controller/customerController');
const validate = require('../middlewares/validate.middleware');
const customerSchema = require('../schema/customer.schema');


router.post('/', validate(customerSchema), customerController.createCustomer)
router.get('/', customerController.fetchCustomers)
router.get('/search', customerController.searchCustomers);
router.get('/:id', customerController.fetchOneCustomer)
router.patch('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)
 


 module.exports = router;