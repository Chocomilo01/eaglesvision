const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");
const paymentSchema = require("../schema/transaction.schema");
const validate = require("../middlewares/validate.middleware");

// Create a deposit
router.post("/deposit", validate(paymentSchema), transactionController.createDeposit);
// // Get all deposits
router.get('/deposits', transactionController.getAllDeposits);
// GET single deposit
router.get('/deposits/:depositId', transactionController.getDepositById);
router.get("/transactions", transactionController.getAllTransactions);
router.get('/transactions/cash', transactionController.getAllTransactionsByCash);
router.get('/transactions/transfer', transactionController.getAllTransactionsByTransfer);
router.get("/customer/:customerId/transactions", transactionController.getAllTransactionsByCustomer);

router.get('/getAllTransactionsByCollector', transactionController.getAllTransactionsByCollector);
// create withdrawal
router.post("/withdrawal", validate(paymentSchema), transactionController.createWithdrawal);
// GET all withdrawals
router.get('/withdrawals', transactionController.getAllWithdrawals);
router.get('/withdrawals/:withdrawals', transactionController.getWithdrawalById);
//router.put('/transactions/:id', validate,transactionController.updateTransaction);

// Define a route to search transactions by payment date
router.get("/searchTransactionsByPaymentDate", transactionController.searchTransactionsByPaymentDate);
router.get("/totalDepositByTransferByPaymentDate", transactionController.getTotalDepositByTransferByPaymentDate);
router.get("/totalDepositByCashByPaymentDate", transactionController.getTotalDepositByCashByPaymentDate);
router.get("/totalWithdrawalsByCashByPaymentDate", transactionController.getTotalWithdrawalsByCashByPaymentDate);
router.get("/totalWithdrawalsByTransferByPaymentDate", transactionController.getTotalWithdrawalsByTransferByPaymentDate);
router.get("/totalDepositByPaymentDate", transactionController.getTotalDepositByPaymentDate);

// Define a route to get all withdrawals by payment date
router.get("/withdrawalsByPaymentDate", transactionController.getAllWithdrawalsByPaymentDate);
// To get the total transactions by date
//router.get("/search-by-date", transactionController.searchTransactionsByDate);
//router.get('/search-deposit-cash-by-date', transactionController.searchDepositCashByDate);

module.exports = router;
