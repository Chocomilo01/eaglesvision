const express = require('express');
const router = express.Router();

const { adminAuthorizer, authenticate }  = require('../middlewares/authentication');
const customerController = require('../controller/customerController');


router.post('/', customerController.createCustomer)
 router.get('/:id', customerController.fetchOneCustomer)
 router.patch('/:id', customerController.updateCustomer)
 router.get('/', customerController.fetchCustomers)
 router.delete('/:id', customerController.deleteCustomer)

 module.exports = router;