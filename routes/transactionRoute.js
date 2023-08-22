const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

// ...existing routes...

// Endpoint to deposit money into a customer's account
router.post('/deposit/:id', transactionController.depositMoney);

module.exports = router;