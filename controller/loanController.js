const cron = require('node-cron');
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
        LoanRequestedAmount,
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
      //const interestAmount = (parsedAmount * parsedInterestRate) / 100;
      const interestAmount = disbursementInterestRate;

      // Check if there is an existing loan for this customer
      const existingLoan = await LoanService.fetchOne({ customer: customer._id });

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
        LoanRequestedAmount,
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
  async createRepayment(req, res) {
    try {
      const {
        customerId, // ID of the customer making the repayment
        repaymentAmount, // The amount being repaid
        repaymentDate, // The date of the repayment
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

      // Create a repayment record
      const repayment = await LoanService.create({
        amount: repaymentAmount,
        repaymentDate: new Date(repaymentDate),
        customer: customer._id,
        type: "repayment",
        loanEndDate,
        loanStartDate,
        interestRate,
        status: "repaid",
        // ... Other repayment details ...
      });
      

    cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();

    // Find loans with end dates in the past and status "disbursed"
    const overdueLoans = await LoanModel.find({
      loanEndDate: { $lt: currentDate },
      status: "disbursed",
    });

    // Update the status of overdue loans to "defaulter"
    await Promise.all(
      overdueLoans.map(async (loan) => {
        // Check if the loan amount is fully repaid
        const totalRepayments = await LoanService.calculateTotalRepayments(loan._id);
        if (totalRepayments < loan.amount) {
          loan.status = "defaulter";
          await loan.save();
        }
      })
    );

    console.log("Loan statuses updated successfully.");
  } catch (error) {
    console.error("Error updating loan statuses:", error.message);
  }
});

      return res.status(201).json({
        success: true,
        message: "Loan repayment created successfully",
        data: repayment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating loan repayment",
        error: error.message,
      });
    }
  }
  
  

  async getLoans(req, res) {
    try {
      // Fetch all loans
      const loans = await LoanService.fetch({});
      
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
      const { loanId } = req.params;

      // Fetch the loan by ID
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

