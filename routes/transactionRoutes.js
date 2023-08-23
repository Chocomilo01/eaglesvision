const express = require("express");
const router = express.Router();
const { adminAuthorizer, authenticate } = require("../middlewares/authentication");
const transactionController = require("../controller/transactionController");

// Create a deposit
router.post("/deposit", transactionController.createDeposit);
router.post("/withdrawal", transactionController.createWithdrawal);


// Define other transaction routes here

module.exports = router;
