const cron = require("node-cron");
const LoanService = require("../services/loanService");
const CustomerService = require("../services/customerService");

class LoanController {
  async createLoan(req, res) {
    try {
      const {
        customerId,
        amount,
        loanTitle,
        phoneNo1,
        phoneNo2,
        houseAddress,
        officeAddress,
        maritalStatus,
        currentOccupationOfApplicant,
        spousePhoneNo,
        spouseName,
        spouseOccupation,
        spouseOfficeAddress,
        loanRequestedAmount,
        firstGuarantorsName,
        firstGuarantorsSex,
        firstGuarantorsDateOfBirth,
        firstGuarantorsPhoneNumber,
        firstGuarantorsOccupation,
        firstGuarantorsHouseAddress,
        firstGuarantorsOfficeAddress,
        secondGuarantorsName,
        secondGuarantorsSex,
        secondGuarantorsDateOfBirth,
        secondGuarantorsPhoneNumber,
        secondGuarantorsOccupation,
        secondGuarantorsHouseAddress,
        secondGuarantorsOfficeAddress,
        interestRate,
        loanDuration,
        loanStartDate,
        loanEndDate,
        repaymentSchedule,
        // ...other loan details...
      } = req.body;

      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Parse interest rate and loan amount as numbers
      const disbursementInterestRate = parseFloat(interestRate);
      const disbursementAmount = parseFloat(amount);

      if (isNaN(disbursementInterestRate) || isNaN(disbursementAmount)) {
        return res.status(400).json({
          success: false,
          message: "Invalid interest rate or loan amount",
        });
      }

      // Calculate the interest amount based on the loan amount and interest rate
      const interestAmount = disbursementInterestRate;

      // Check if there is an existing loan for this customer
      const existingLoan = await LoanService.fetchOne({
        customer: customer._id,
      });

      if (existingLoan) {
        return res.status(400).json({
          success: false,
          message: "An existing loan already exists for this customer",
        });
      }

      // If there is no existing loan, create a new loan
      const loan = await LoanService.create({
        amount: disbursementAmount + interestAmount, // Add interest to the loan amount
        type: "disbursement",
        loanTitle,
        phoneNo1,
        phoneNo2,
        houseAddress,
        officeAddress,
        maritalStatus,
        currentOccupationOfApplicant,
        spousePhoneNo,
        spouseName,
        spouseOccupation,
        spouseOfficeAddress,
        loanRequestedAmount,
        firstGuarantorsName,
        firstGuarantorsSex,
        firstGuarantorsDateOfBirth,
        firstGuarantorsPhoneNumber,
        firstGuarantorsOccupation,
        firstGuarantorsHouseAddress,
        firstGuarantorsOfficeAddress,
        secondGuarantorsName,
        secondGuarantorsSex,
        secondGuarantorsDateOfBirth,
        secondGuarantorsPhoneNumber,
        secondGuarantorsOccupation,
        secondGuarantorsHouseAddress,
        secondGuarantorsOfficeAddress,
        status: "disbursed",
        interestRate,
        loanDuration,
        loanStartDate,
        loanEndDate,
        repaymentSchedule,
        customer: customer._id,
        balance: disbursementAmount + interestAmount,
      });

      return res.status(201).json({
        success: true,
        message: "Loan created and disbursed successfully",
        data: loan,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating",
        error: error.message,
      });
    }
  }

  async createWithdrawal(req, res) {
    try {
      const {
        customerId, // ID of the customer making the withdrawal
        withdrawalAmount, // The amount being withdrawn
        loanEndDate,
        loanStartDate,
        interestRate,
      } = req.body;

      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Find the existing loan for the customer
      const existingLoan = await LoanService.fetchOne({
        customer: customer._id,
      });

      if (!existingLoan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found for this customer",
        });
      }

      // Calculate the remaining loan balance after deducting the withdrawal amount
      const remainingLoanBalance = existingLoan.balance - withdrawalAmount;

      if (remainingLoanBalance < 0) {
        return res.status(400).json({
          success: false,
          message: "Withdrawal amount exceeds the remaining loan balance",
          remainingLoanBalance: existingLoan.balance,
        });
      }

      // Create a withdrawal record
      const withdrawal = await LoanService.create({
        amount: withdrawalAmount,
        repaymentDate: new Date(),
        customer: customer._id,
        type: "withdrawal",
        status: "withdrawn",
        loanEndDate,
        loanStartDate,
        interestRate,
        balance: remainingLoanBalance,
        // ... Other withdrawal details ...
      });

      // Update the existing loan's balance to the remaining loan balance and save it to the database
      existingLoan.balance = remainingLoanBalance;
      await existingLoan.save();

      // Include the remaining loan balance in the response data
      const responseData = {
        success: true,
        message: "Loan withdrawal created successfully",
        data: withdrawal,
        balance: remainingLoanBalance,
      };

      return res.status(201).json(responseData);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating loan withdrawal",
        error: error.message,
      });
    }
  }

  async createDeposit(req, res) {
    try {
      const {
        customerId, // ID of the customer making the deposit
        depositAmount, // The amount being deposited
        loanEndDate,
        loanStartDate,
        interestRate,
      } = req.body;

      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Find the existing loan for the customer
      const existingLoan = await LoanService.fetchOne({
        customer: customer._id,
      });

      if (!existingLoan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found for this customer",
        });
      }
      // Parse existingLoan.balance, depositAmount, and interestAmount as numbers
      const existingBalance = parseFloat(existingLoan.balance);
      const deposit = parseFloat(depositAmount);
      const interest = parseFloat(interestRate);

      // Check if any of the values is NaN (not a number)
      if (isNaN(existingBalance) || isNaN(deposit) || isNaN(interest)) {
        console.error("Invalid values for balance, deposit, or interest");
        return res.status(500).json({
          success: false,
          message: "Error creating loan deposit",
          error: "Invalid values for balance, deposit, or interest",
        });
      }

      // Calculate the balance after the deposit
      const balanceAfterDeposit = existingBalance + deposit + interest;
      // Create a deposit record
      const depositRecord = await LoanService.create({
        amount: depositAmount,
        repaymentDate: new Date(),
        customer: customer._id,
        type: "deposit",
        status: "deposited",
        loanEndDate,
        loanStartDate,
        interestRate,
        balance: balanceAfterDeposit,

        // ... Other deposit details ...
      });

      // Update the existing loan's balance by adding the deposit amount and save it to the database
      // Update the existing loan's balance by adding the deposit amount and save it to the database
      existingLoan.balance = balanceAfterDeposit;
      await existingLoan.save();

      // Include the remaining loan balance in the response data
      const responseData = {
        success: true,
        message: "Loan deposit created successfully",
        data: depositRecord,
        balance: balanceAfterDeposit, // Include the updated balance in the response
      };

      return res.status(201).json(responseData);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating loan deposit",
        error: error.message,
      });
    }
  }

  async getLoans(req, res) {
    try {
      console.log("Fetching loans...");
      // Fetch all loans using the LoanService
      const loans = await LoanService.getLoans({});
      console.log("Loans fetched successfully");

      return res.status(200).json({
        success: true,
        message: "Loans retrieved successfully",
        data: loans,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching loans",
        error: error.message,
      });
    }
  }

  async getLoanById(req, res) {
    try {
      const { loanId } = req.params; // Assuming the loanId is passed as a URL parameter

      // Fetch the loan by its ID from the database
      const loan = await LoanService.fetchOne({ _id: loanId });

      if (!loan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Loan retrieved successfully",
        data: loan,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching loan",
        error: error.message,
      });
    }
  }
}
module.exports = new LoanController();
