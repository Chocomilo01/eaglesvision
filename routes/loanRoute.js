const express = require("express");
const router = express.Router();
const {
  adminAuthorizer,
  authenticate,
} = require("../middlewares/authentication");
const loanController = require("../controller/loanController");

// Create a deposit
router.post("/disbursement", loanController.createLoan);
//router.post("/repayments", loanController.createRepayment);
router.get("/", loanController.getLoans);
// router.get("/:loanId", loanController.getLoanById);
// In your Express routes definition
router.post("/withdrawals", loanController.createWithdrawal);
router.post("/deposits", loanController.createDeposit);
// Define a route to get defaulters
// router.get("/defaulters", loanController.getDefaulters);
// Define a route to get defaulters
router.get("/by-payment-date", loanController.getLoansByPaymentDate);
// In loanRoute.js
router.get("/total-amount-by-payment-date", loanController.getTotalAmountByPaymentDate);

router.get("/defaulters", loanController.getDefaulters);

// Define a route to get a loan by its ID
router.get("/:loanId", loanController.getLoanById);
// In your Express routes definition (loanRoute.js)
router.get("/customer/:customerId/loans", loanController.getCustomerLoans);
///api/loans/customer/:customerId/loans

//router.post("/disbursement", loanController.createDisbursement);

// Define other transaction routes here

module.exports = router;
