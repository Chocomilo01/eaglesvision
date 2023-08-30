const express = require("express");
const router = express.Router();
const { adminAuthorizer, authenticate } = require("../middlewares/authentication");
const transactionController = require("../controller/transactionController");

// Create a deposit
router.post("/deposit", transactionController.createDeposit);
router.post("/withdrawal", transactionController.createWithdrawal);
// get a single withdrawal
// router.get("/:id", transactionController.getWithdrawalById);
// // Get all withdrawals
// router.get("/withdrawals", transactionController.getAllWithdrawals);
// //router.get("/deposits-by-date", transactionController.getDepositsByDate);




// // Get all deposits
// router.get("/deposits", transactionController.getAllDeposits);



module.exports = router;
