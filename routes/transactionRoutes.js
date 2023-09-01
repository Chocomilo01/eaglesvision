const express = require("express");
const router = express.Router();
const { adminAuthorizer, authenticate } = require("../middlewares/authentication");
const transactionController = require("../controller/transactionController");

// Create a deposit
router.post("/deposit", transactionController.createDeposit);
// // Get all deposits
router.get('/deposits', transactionController.getAllDeposits);
// GET single deposit
router.get('/deposits/:depositId', transactionController.getDepositById);


// create withdrawal
router.post("/withdrawal", transactionController.createWithdrawal);
// GET all withdrawals
router.get('/withdrawals', transactionController.getAllWithdrawals);
router.get('/withdrawals/:withdrawalId', transactionController.getWithdrawalById);


// To get the total transactions by date
router.get("/search-by-date", transactionController.searchTransactionsByDate);

module.exports = router;
