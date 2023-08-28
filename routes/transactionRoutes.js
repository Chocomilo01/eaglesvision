const express = require("express");
const router = express.Router();
const { adminAuthorizer, authenticate } = require("../middlewares/authentication");
const transactionController = require("../controller/transactionController");

// Create a deposit
router.post("/deposit", transactionController.createDeposit);
router.post("/withdrawal", transactionController.createWithdrawal);
// get a single withdrawal
router.get("/:id", transactionController.getWithdrawalById);
// Get all withdrawals
router.get("/withdrawals", transactionController.getAllWithdrawals);



// Get all deposits
router.get("/deposits", transactionController.getAllDeposits);
// Get a single deposit by ID
router.get("/deposits/:depositId", transactionController.getDepositById);


module.exports = router;
