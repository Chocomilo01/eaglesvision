const cron = require("node-cron");
const LoanService = require("../services/loanService");
const CustomerService = require("../services/customerService");
const loanModel = require("../model/loanModel");

class LoanController {
  async createLoan(req, res) {
    try {
      const {
        customerId,
        name,
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
        repaymentSchedule,
        loanEndDate,
        description,
        uploadedBy,
        collectedBy,
        paymentDate,
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
       // type: "disbursement" // condition to check for disbursements only
      });

      if (existingLoan) {
        return res.status(400).json({
          success: false,
          message: "An existing loan already exists for this customer",
        });
      }

      // If there is no existing loan, create a new loan
      const loan = await LoanService.create({
        //amount: disbursementAmount + interestAmount, // Add interest to the loan amount
        amount: disbursementAmount,
        type: "disbursement",
        name: customer.name, // Include the customer's name here
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
        status:  "active",
        interestRate,
        loanDuration,
        loanStartDate,
        loanEndDate,
        description,
        repaymentSchedule,
        paymentDate: new Date(),
        customer: customer._id,
        balance: disbursementAmount + interestAmount,
        totalLoanRecieved: disbursementAmount,
        totalInterestAccured: interestAmount,
        // totalLoanRePaid: existingLoan.totalLoanRePaid,
        repaymentDate: loanEndDate,
        uploadedBy,
        collectedBy,

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

  async updateLoan(req, res) {
    try {
      const { loanId } = req.params;
      const updateData = req.body;
  
      // Fetch the existing loan
      const existingLoan = await LoanService.fetchOne({ _id: loanId });
  
      if (!existingLoan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found",
        });
      }
  
      // Calculate the updated loan amounts and interests
      const updatedAmount = parseFloat(updateData.amount);
      const updatedInterest = parseFloat(updateData.interestRate);
      const totalAmount = updatedAmount + updatedInterest;
  
      // Calculate the updated totals
      const totalLoanRecieved = totalAmount - updatedInterest;
      const totalInterestAccured = updatedInterest;
      const totalLoanRePaid = existingLoan.totalLoanRePaid;
  
      // Update the loan using LoanService
      const updatedLoan = await LoanService.update({ _id: loanId }, {
        ...updateData,
        totalLoanRecieved,
        totalInterestAccured,
        totalLoanRePaid,
        balance: totalLoanRecieved - totalLoanRePaid + totalInterestAccured,
      });
  
      // Update the corresponding customer's totals
      await CustomerService.update(
        { _id: existingLoan.customer },
        {
          totalLoanRecieved,
          totalInterestAccured,
          totalLoanRePaid,
          balance: totalLoanRecieved - totalLoanRePaid,
        }
      );
  
      return res.status(200).json({
        success: true,
        data: updatedLoan,
        message: "Loan updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  
  // async updateLoan(req, res) {
  //   try {
  //     const { loanId } = req.params;
  //     const updateData = req.body;
  
  //     // Update the loan using the LoanService
  //     const updatedLoan = await LoanService.update({ _id: loanId }, updateData);
  
  //     return res.status(200).json({
  //       success: true,
  //       message: "Loan updated successfully",
  //       data: updatedLoan,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Error updating loan",
  //       error: error.message,
  //     });
  //   }
  // }
  

  async deleteLoan(req, res) {
    try {
      const { loanId } = req.params;
  
      // Use LoanService to delete the loan
      const result = await LoanService.delete({ _id: loanId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Loan not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Loan deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error deleting loan",
        error: error.message,
      });
    }
  }

  async createWithdrawal(req, res) {
    try {
      const {
        customerId, // ID of the customer making the withdrawal
        amount, // The amount being withdrawn
        loanEndDate,
        loanStartDate,
        interestRate,
        modeOfPayment,
        collectedBy,
        description,
        uploadedBy,
        name,
        firstGuarantorsName,
        firstGuarantorsPhoneNumber,
        firstGuarantorsOccupation,
        secondGuarantorsName,
        secondGuarantorsPhoneNumber,
        secondGuarantorsOccupation,
        phoneNo1,
      } = req.body;

      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // // Find the existing loan for the customer
      const existingLoan = await loanModel.findOne({
        customer: customer._id,
      }).sort({ createdAt: -1 }).exec();

      if (!existingLoan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found for this customer",
        });
      }

      // Check if there is an existing withdrawal for the same customer within a certain time frame
        // const existingWithdrawal = await loanModel.findOne({
        //     customer: customer._id,
        //     type: "withdrawal",
        //     createdAt: {
        //         $gte: new Date(loanStartDate), // Greater than or equal to loan start date
        //         $lte: new Date(loanEndDate),   // Less than or equal to loan end date
        //     },
        // });

        if (existingWithdrawal) {
            return res.status(400).json({
                success: false,
                message: "A withdrawal already exists for this customer within the specified time frame",
            });
        }
      
      // Calculate the remaining loan balance after deducting the withdrawal amount
      const remainingLoanBalance = existingLoan.balance - amount;
      // const loan_repaid = existingLoan.totalLoanRePaid + amount;
      const loan_repaid = parseInt(existingLoan.totalLoanRePaid) + parseInt(amount);

      
      if (remainingLoanBalance < 0) {
        return res.status(400).json({
          success: false,
          message: "Withdrawal amount exceeds the remaining loan balance",
          remainingLoanBalance: existingLoan.balance,
        });
      }

      // Create a withdrawal record
      const withdrawal = await LoanService.create({
        amount: amount,
        repaymentDate: new Date(),
        customer: customer._id,
        type: "withdrawal",
        status: "withdrawn",
        description,
        loanEndDate,
        loanStartDate,
        interestRate,
        paymentDate: new Date(),
        balance: remainingLoanBalance,
        totalLoanRePaid: loan_repaid,
        totalLoanRecieved: existingLoan.totalLoanRecieved,
        totalInterestAccured: existingLoan.totalInterestAccured,
        description,
        modeOfPayment,
        collectedBy,
        uploadedBy,
        name: customer.name, // Include the customer's name here
        firstGuarantorsName,
        firstGuarantorsPhoneNumber,
        firstGuarantorsOccupation,
        secondGuarantorsName,
        secondGuarantorsPhoneNumber,
        secondGuarantorsOccupation,
        phoneNo1,
      
        // ... Other withdrawal details ...
      });

      // Update the existing loan's balance to the remaining loan balance and save it to the database
      // existingLoan.balance = remainingLoanBalance;
      // await existingLoan.save();

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
        amount, // The amount being deposited
        loanEndDate,
        loanStartDate,
        interestRate,
        modeOfPayment,
        description,
        collectedBy,
        uploadedBy,
        name,
        firstGuarantorsName,
        firstGuarantorsPhoneNumber,
        firstGuarantorsOccupation,
        secondGuarantorsName,
        secondGuarantorsPhoneNumber,
        secondGuarantorsOccupation,
        phoneNo1,
        
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
      const existingLoan = await loanModel.findOne({
        customer: customer._id,
      }).sort({ createdAt: -1 }).exec();

      if (!existingLoan) {
        return res.status(404).json({
          success: false,
          message: "Loan not found for this customer",
        });
      }

      // const existingDeposit = await loanModel.findOne({
      //       customer: customer._id,
      //       type: "deposit",
      //       createdAt: {
      //           $gte: new Date(loanStartDate), // Greater than or equal to loan start date
      //           $lte: new Date(loanEndDate),   // Less than or equal to loan end date
      //       },
      //   });

        if (existingDeposit) {
            return res.status(400).json({
                success: false,
                message: "A deposit already exists for this customer within the specified time frame",
            });
        }
      // Parse existingLoan.balance, depositAmount, and interestAmount as numbers
      const existingBalance = parseFloat(existingLoan.balance);
      const deposit = parseFloat(amount);
      const interest = parseFloat(interestRate);
      // console.log(existingBalance, deposit, interest)

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
      // const loan_recieved = existingLoan.totalLoanRecieved + deposit + interest;
      const loan_recieved = existingLoan.totalLoanRecieved + deposit;
      const interest_recieved = existingLoan.totalInterestAccured + interest;

      // Create a deposit record
      const depositRecord = await LoanService.create({
        amount: amount,
        repaymentDate: new Date(),
        customer: customer._id,
        type: "deposit",
        status: "deposited",
        loanEndDate,
        loanStartDate,
        interestRate,
        description,
        modeOfPayment,
        collectedBy,
        uploadedBy,
        name: customer.name, // Include the customer's name here
        paymentDate: new Date(),
        balance: balanceAfterDeposit,
        totalLoanRecieved: loan_recieved,
        totalLoanRePaid: existingLoan.totalLoanRePaid,
        totalInterestAccured: interest_recieved,
        firstGuarantorsName,
        firstGuarantorsPhoneNumber,
        firstGuarantorsOccupation,
        secondGuarantorsName,
        secondGuarantorsPhoneNumber,
        secondGuarantorsOccupation,
        phoneNo1,
        

        // ... Other deposit details ...
      });

      // Update the existing loan's balance by adding the deposit amount and save it to the database
      // Update the existing loan's balance by adding the deposit amount and save it to the database
      // existingLoan.balance = balanceAfterDeposit;
      // await existingLoan.save();

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

  async getLoansByPaymentDate(req, res) {
    try {
      const { startDate, endDate } = req.query;
  
      // Validate and process startDate and endDate as necessary
  
      // Create a date range query for the paymentDate field
      const dateRangeQuery = {
        paymentDate: {
          $gte: startDate, // Greater than or equal to startDate
          $lte: endDate,   // Less than or equal to endDate
        },
      };
  
      // Query the database to find loans within the specified date range
      const loans = await LoanService.fetch(dateRangeQuery);
  
      return res.status(200).json({
        success: true,
        message: "Loans retrieved by payment date range successfully",
        data: loans,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching loans by payment date range",
        error: error.message,
      });
    }
  }
  
  async getTotalAmountByPaymentDate(req, res) {
  try {
    const { startDate, endDate } = req.query;

    // Validate and process startDate and endDate as necessary

    // Create a date range query for the paymentDate field
    const dateRangeQuery = {
      paymentDate: {
        $gte: startDate, // Greater than or equal to startDate
        $lte: endDate,   // Less than or equal to endDate
      },
    };

    // Query the database to find loans within the specified date range
    const loans = await LoanService.fetch(dateRangeQuery);

    // Calculate the total amount for disbursements and deposits
    let totalDisbursements = 0;
    let totalDeposits = 0;

    loans.forEach((loan) => {
      if (loan.type === "disbursement") {
        totalDisbursements += loan.amount;
      } else if (loan.type === "deposit") {
        totalDeposits += loan.amount;
      }
    });

    return res.status(200).json({
      success: true,
      message: "Total amount by payment date retrieved successfully",
      totalDisbursements,
      totalDeposits,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching total amount by payment date",
      error: error.message,
    });
  }
  } 

  async getDefaulters(req, res) {
    try {
      // Find all loans with a status of "defaulter"
      const defaulters = await LoanService.getDefaulters();
  
      console.log("Defaulters found:", defaulters); // Add this line for logging
  
      return res.status(200).json({
        success: true,
        message: "Defaulters retrieved successfully",
        data: defaulters,
      });
    } catch (error) {
      console.error("Error fetching defaulters:", error.message); // Add this line for logging
  
      return res.status(500).json({
        success: false,
        message: "Error fetching defaulters",
        error: error.message,
      });
    }
  }

  // async getLoans(req, res) {
  //   try {
  //     console.log("Fetching loans...");
  //     // Fetch all loans using the LoanService
  //     const loans = await LoanService.getLoans({});
  //     console.log("Loans fetched successfully");

  //     return res.status(200).json({
  //       success: true,
  //       message: "Loans retrieved successfully",
  //       data: loans,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Error fetching loans",
  //       error: error.message,
  //     });
  //   }
  // }

  async getLoans(req, res) {
    try {
      console.log("Fetching loans...");
      // Fetch all loans using the LoanService
      let loans = await LoanService.getLoans({});
  
      // // Loop through each loan to calculate and update the latest figures
      // for (let i = 0; i < loans.length; i++) {
      //   const loan = loans[i];
      //   // Update the loan figures using LoanService method
      //   const updatedLoanFigures = await LoanService.updateLoanFigures(loan._id); // Assuming you have a method in LoanService to update these figures
      //   // Update the loan object with the latest figures
      //   loan.totalLoanRecieved = updatedLoanFigures.totalLoanRecieved;
      //   loan.totalInterestAccured = updatedLoanFigures.totalInterestAccured;
      //   loan.totalLoanRePaid = updatedLoanFigures.totalLoanRePaid;
      //   loan.balance = updatedLoanFigures.balance;
      // }
  
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

  async getCustomerLoans(req, res) {
    try {
      const { customerId } = req.params;
  
      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });
  
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }
  
      // Query the database for loans associated with the customer
      const customerLoans = await LoanService.fetch({ customer: customerId });
  
      return res.status(200).json({
        success: true,
        message: "Customer loans retrieved successfully",
        data: customerLoans,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching customer loans",
        error: error.message,
      });
    }
  }

  async getLoansDepositedByCashAndPaymentDate(req, res) {
    try {
      const { startDate, endDate } = req.query;
  
      // Validate and process startDate and endDate as necessary
  
      const depositLoans = await LoanService.getLoansDepositedByCashAndPaymentDate(startDate, endDate);
  
      return res.status(200).json({
        success: true,
        message: "Loans deposited by cash retrieved successfully by payment date",
        data: depositLoans,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching loans deposited by cash by payment date",
        error: error.message,
      });
    }
  }

  async getTotalDepositAmountByCash(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "Start date and end date are required",
        });
      }

      const totalDepositAmount = await LoanService.getTotalDepositAmountByCashAndDateRange(
        startDate,
        endDate
      );

      return res.status(200).json({
        success: true,
        message: "Total deposit amount via cash retrieved successfully",
        totalDepositAmount,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching total deposit amount via cash",
        error: error.message,
      });
    }
  }

  async getLoansDepositedByTransfer(req, res) {
    try {
      const { startDate, endDate } = req.query;
  
      // Validate and process startDate and endDate as necessary
  
      // Create a date range query for the paymentDate field
      const dateRangeQuery = {
        paymentDate: {
          $gte: startDate, // Greater than or equal to startDate
          $lte: endDate,   // Less than or equal to endDate
        },
      };
  
      // Query the database to find loans that are "deposits" and via "transfer" within the specified date range
      const depositLoans = await LoanService.fetch({
        $and: [
          { type: "deposit" },
          { modeOfPayMent: "transfer" },
          dateRangeQuery,
        ],
      });
  
      // Calculate the total deposit amount
      let totalDeposits = 0;
      depositLoans.forEach((loan) => {
        totalDeposits += loan.amount;
      });
  
      return res.status(200).json({
        success: true,
        message: "Total loan deposits via transfer retrieved successfully",
        totalDeposits,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching total loan deposits via transfer",
        error: error.message,
      });
    }
  }
  
  async getLoansByCollector(req, res) {
    try {
      const { collectorName } = req.params;
  
      // Query the database to find loans collected by the specified collectorName
      const loans = await LoanService.getLoansByCollector(collectorName);
  
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
  
  // async getCustomerLoans(req, res, next) {
  //   try {
  //     const customerId = req.params.customerId;
  //     const customerLoans = await LoanService.getCustomerLoans(customerId);
  //     res.status(200).json(customerLoans);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getTotalloanRecievedOnDB(req, res, next) {
    try {
      const totals = await LoanService.getLoansTotals();
      res.status(200).json({
        success: true, message: "total loan approved fetched", data: totals});
    } catch (error) {
      next(error);
    }
  }

  async getTotalLoanBalance(req, res) {
    try {
      // Fetch all loans using the LoanService
      const loans = await LoanService.getLoans({});

      // Calculate the total loan balance
      let totalBalance = 0;
      loans.forEach((loan) => {
        totalBalance += loan.balance;
      });

      return res.status(200).json({
        success: true,
        message: "Total loan balance retrieved successfully",
        totalBalance: totalBalance.toFixed(2), // Optionally round to 2 decimal places
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching total loan balance",
        error: error.message,
      });
    }
  }
//   async getDuplicateLoans(req, res) {
//     try {
//         const duplicateLoans = await LoanService.findDuplicateLoans();

//         return res.status(200).json({
//             success: true,
//             message: "Duplicate loans fetched successfully",
//             data: duplicateLoans,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Error fetching duplicate loans",
//             error: error.message,
//         });
//     }
// }

// async getDuplicateLoanIds(req, res) {
//   try {
//     const duplicateIds = await LoanService.findDuplicateLoanIds();
    
//     res.status(200).json({
//       success: true,
//       data: duplicateIds,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching duplicate loan IDs",
//       error: error.message,
//     });
//   }
// }

// async deleteDuplicateLoans(req, res) {
//   try {
//     const duplicateIds = await LoanService.findAndDeleteDuplicateLoans();
    
//     res.status(200).json({
//       success: true,
//       data: duplicateIds,
//       message: "Duplicate loans deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error deleting duplicate loans",
//       error: error.message,
//     });
//   }
// }
  
}
module.exports = new LoanController();
