const express = require("express");
const router = express.Router();
const { adminAuthorizer, authenticate } = require("../middlewares/authentication");
const loanController = require("../controller/loanController");

// Create a deposit
router.post("/disbursement", loanController.createLoan);
router.post("/repayments", loanController.createRepayment);
router.get("/", loanController.getLoans);
router.get("/:loanId", loanController.getLoanById);

//router.post("/disbursement", loanController.createDisbursement);


// Define other transaction routes here

module.exports = router;