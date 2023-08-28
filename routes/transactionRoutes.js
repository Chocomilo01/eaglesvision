const express = require("express");
const router = express.Router();
const { adminAuthorizer, authenticate } = require("../middlewares/authentication");
const transactionController = require("../controller/transactionController");

// Create a deposit
router.post("/deposit", transactionController.createDeposit);
router.post("/withdrawal", transactionController.createWithdrawal);
// Get all deposits
router.get("/deposits", transactionController.getAllDeposits);
// Get a single deposit by ID
router.get("/deposits/:depositId", transactionController.getDepositById);



// Define other transaction routes here

module.exports = router;
