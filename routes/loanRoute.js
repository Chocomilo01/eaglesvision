const express = require("express");
const router = express.Router();
const {
  adminAuthorizer,
  authenticate,
  admin_managerAuthorizer,
  managerAuthorizer,
} = require("../middlewares/authentication");
const loanController = require("../controller/loanController");

// Create a deposit
router.post("/disbursement", loanController.createLoan);
//router.post("/repayments", loanController.createRepayment);
router.patch("/:loanId", adminAuthorizer, loanController.updateLoan);
router.get("/", loanController.getLoans);
router.delete("/:loanId", adminAuthorizer, loanController.deleteLoan)
// router.get("/:loanId", loanController.getLoanById);
// In your Express routes definition
router.post("/withdrawals", loanController.createWithdrawal);
router.post("/deposits", loanController.createDeposit);
router.get("/customer/:customerId/loans", loanController.getCustomerLoans);
// Define a route to get defaulters
// router.get("/defaulters", loanController.getDefaulters);
router.get("/total-deposit-amount-by-cash", loanController.getTotalDepositAmountByCash);
router.get('/loans/depositsByTransfer', loanController.getLoansDepositedByTransfer);
//router.get("/total-deposits/transfer", loanController.getTotalDepositsByTransfer)
router.get("/by-payment-date", loanController.getLoansByPaymentDate);
router.get('/byCollector/:collectorName', loanController.getLoansByCollector);
router.get("/total-amount-by-payment-date", loanController.getTotalAmountByPaymentDate);
router.get('/total-balance', loanController.getTotalLoanBalance);
router.get("/defaulters", loanController.getDefaulters);
router.get("/bank/recieved", loanController.getTotalloanRecievedOnDB);
// Define a route for getting loans deposited by cash within a date range
router.get('/loans/depositsByCashAndPaymentDate', loanController.getLoansDepositedByCashAndPaymentDate);
// Define a route to get a loan by its ID
router.get("/:loanId", loanController.getLoanById);


module.exports = router;