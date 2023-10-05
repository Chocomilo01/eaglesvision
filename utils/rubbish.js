// const TransactionService = require("../services/transactionService");
// const CustomerService = require("../services/customerService");
// const { generateResponsePayload } = require("../utils/generateResponsePayload");


  
  
//     class TransactionController {
     
//       async createDeposit(req, res) {
//         try {
//           const { customerId, amount } = req.body;
//           // Verify that the customer exists
//           const customer = await CustomerService.fetchOne({ _id: customerId });
//           if (!customer) {
//             return res.status(404).json({
//               success: false,
//               message: "Customer not found",
//             });
//           }
      
//           // Ensure that the deposit amount is a valid number
//           const depositAmount = parseFloat(amount);
//           if (isNaN(depositAmount) || depositAmount <= 0) {
//             return res.status(400).json({
//               success: false,
//               message: "Invalid deposit amount",
//             });
//           }
      
//           // Create a deposit transaction
//           const depositTransaction = await TransactionService.create({
//             type: "deposit",
//             amount: depositAmount, // Use the valid deposit amount
//             customer: customer._id,
//             userId: req.body.id,
//             firstName: req.body.firstName,
//             middleName: req.body.middleName,
//           });
      
//           // Update the customer's account balance
//           customer.accountBalance += depositAmount;
//           await customer.save();
      
//           const updatedBalance = customer.accountBalance;
      
//           // Use the common function to generate the response payload
//           const responsePayload = generateResponsePayload(
//             depositTransaction,
//             updatedBalance,
//             req.body.id,
//             req.body.firstName,
//             req.body.middleName
//           );
      
//           return res.status(201).json({
//             success: true,
//             message: "Deposit created successfully",
//             data: responsePayload,
//           });
//         } catch (error) {
//           return res.status(500).json({
//             success: false,
//             message: "Error creating deposit",
//             error: error.message,
//           });
//         }
//       }
      
// async createWithdrawal(req, res) {
//   try {
//     const { customerId, amount } = req.body;

//     // Verify that the customer exists
//     const customer = await CustomerService.fetchOne({ _id: customerId });

//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer not found",
//       });
//     }

//     // Check if the customer has sufficient balance for the withdrawal
//     if (customer.accountBalance < amount) {
//       return res.status(400).json({
//         success: false,
//         message: "Insufficient funds for withdrawal",
//       });
//     }
    
//     customer.accountBalance -= amount; // Subtract the withdrawn amount
//     if (amount <= 0 || amount > customer.accountBalance) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid withdrawal amount",
//       });
//     }
//     const responsePayload = generateResponsePayload(
//       withdrawalTransaction,
//       updatedBalance,
//       req.body.id,
//       req.body.firstName,
//       req.body.middleName
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Withdrawal created successfully",
//       data: responsePayload,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error creating withdrawal",
//       error: error.message,
//     });
//   }
// }
// }

// module.exports = new TransactionController();


// const cron = require('node-cron');
// const LoanService = require("../services/loanService");
// const CustomerService = require("../services/customerService");

// class LoanController {
//   async createLoan(req, res) {
//     try {
//       const {
//         customerId,
//         amount,
//         loanTitle,
//         phoneNo1,
//         phoneNo2,
//         houseAddress,
//         officeAddress,
//         maritalStatus,
//         currentOccupationOfApplicant,
//         spousePhoneNo,
//         spouseName,
//         spouseOccupation,
//         spouseOfficeAddress,
//         LoanRequestedAmount,
//         firstGuarantorsName,
//         firstGuarantorsSex,
//         firstGuarantorsDateOfBirth,
//         firstGuarantorsPhoneNumber,
//         firstGuarantorsOccupation,
//         firstGuarantorsHouseAddress,
//         firstGuarantorsOfficeAddress,
//         secondGuarantorsName,
//         secondGuarantorsSex,
//         secondGuarantorsDateOfBirth,
//         secondGuarantorsPhoneNumber,
//         secondGuarantorsOccupation,
//         secondGuarantorsHouseAddress,
//         secondGuarantorsOfficeAddress, 
//         interestRate,
//         loanDuration,
//         loanStartDate,
//         loanEndDate,
//         repaymentSchedule,
//         // ...other loan details...
//       } = req.body;

//       // Verify that the customer exists
//       const customer = await CustomerService.fetchOne({ _id: customerId });

//       if (!customer) {
//         return res.status(404).json({
//           success: false,
//           message: "Customer not found",
//         });
//       }

//       // Parse interest rate and loan amount as numbers
//       const disbursementInterestRate = parseFloat(interestRate);
//       const disbursementAmount = parseFloat(amount);

//       if (isNaN(disbursementInterestRate) || isNaN(disbursementAmount)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid interest rate or loan amount",
//         });
//       }

//       // Calculate the interest amount based on the loan amount and interest rate
//       //const interestAmount = (parsedAmount * parsedInterestRate) / 100;
//       const interestAmount = disbursementInterestRate;

//       // Check if there is an existing loan for this customer
//       const existingLoan = await LoanService.fetchOne({ customer: customer._id });

//       if (existingLoan) {
//         return res.status(400).json({
//           success: false,
//           message: "An existing loan already exists for this customer",
//         });
//       }

//       // If there is no existing loan, create a new loan
//       const loan = await LoanService.create({
//         amount: disbursementAmount + interestAmount, // Add interest to the loan amount
//         type: "disbursement",
//         loanTitle,
//         phoneNo1,
//         phoneNo2,
//         houseAddress,
//         officeAddress,
//         maritalStatus,
//         currentOccupationOfApplicant,
//         spousePhoneNo,
//         spouseName,
//         spouseOccupation,
//         spouseOfficeAddress,
//         LoanRequestedAmount,
//         firstGuarantorsName,
//         firstGuarantorsSex,
//         firstGuarantorsDateOfBirth,
//         firstGuarantorsPhoneNumber,
//         firstGuarantorsOccupation,
//         firstGuarantorsHouseAddress,
//         firstGuarantorsOfficeAddress,
//         secondGuarantorsName,
//         secondGuarantorsSex,
//         secondGuarantorsDateOfBirth,
//         secondGuarantorsPhoneNumber,
//         secondGuarantorsOccupation,
//         secondGuarantorsHouseAddress,
//         secondGuarantorsOfficeAddress,
//         status: "disbursed",
//         interestRate,
//         loanDuration,
//         loanStartDate,
//         loanEndDate,
//         repaymentSchedule,
//         customer: customer._id,
//       });

//       return res.status(201).json({
//         success: true,
//         message: "Loan created and disbursed successfully",
//         data: loan,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error creating",
//         error: error.message,
//       });
//     }
//   }
//   async createRepayment(req, res) {
//     try {
//       const {
//         customerId, // ID of the customer making the repayment
//         repaymentAmount, // The amount being repaid
//         repaymentDate, // The date of the repayment
//         loanEndDate,
//         loanStartDate,
//         interestRate,
//       } = req.body;
  
//       // Verify that the customer exists
//       const customer = await CustomerService.fetchOne({ _id: customerId });
  
//       if (!customer) {
//         return res.status(404).json({
//           success: false,
//           message: "Customer not found",
//         });
//       }
  
//       // Find the existing loan for the customer
//       const existingLoan = await LoanService.fetchOne({ customer: customer._id });
  
//       if (!existingLoan) {
//         return res.status(404).json({
//           success: false,
//           message: "Loan not found for this customer",
//         });
//       }

//       // Calculate the remaining loan amount after deducting the repayment
//       // const remainingLoanAmount = existingLoan.amount - repaymentAmount;
  
//       // // Check if the repayment amount is more than the remaining loan balance
//       // if (repaymentAmount > existingLoan.amount) {
//       //   return res.status(400).json({
//       //     success: false,
//       //     message: "Repayment amount exceeds the remaining loan balance",
//       //     remainingLoanBalance: existingLoan.amount,
//       //   });
//       // }
  
//       // Create a repayment record
//       const repayment = await LoanService.create({
//         amount: repaymentAmount,
//         repaymentDate: new Date(repaymentDate),
//         customer: customer._id,
//         type: "repayment",
//         loanEndDate,
//         loanStartDate,
//         interestRate,
//         status: "repaid",
//         // ... Other repayment details ...
//       });
  
//       // Update the existing loan's amount to the remaining loan amount and save it to the database
//       //existingLoan.amount = remainingLoanAmount;
//       await existingLoan.save();
  
//       // Schedule the cron job to check for defaulters
//       cron.schedule("0 0 * * *", async () => {
//         try {
//           const currentDate = new Date();
  
//           // Find loans with end dates in the past and status "disbursed"
//           const overdueLoans = await LoanModel.find({
//             loanEndDate: { $lt: currentDate },
//             status: "disbursed",
//           });
  
//           // Update the status of overdue loans to "defaulter"
//           await Promise.all(
//             overdueLoans.map(async (loan) => {
//               // Check if the loan amount is fully repaid
//               const totalRepayments = await LoanService.calculateTotalRepayments(loan._id);
//               if (totalRepayments < loan.amount) {
//                 loan.status = "defaulter";
//                 await loan.save();
//               }
//             })
//           );
  
//           console.log("Loan statuses updated successfully.");
//         } catch (error) {
//           console.error("Error updating loan statuses:", error.message);
//         }
//       });
  
//       // Include the loan balance in the response data
//       const responseData = {
//         success: true,
//         message: "Loan repayment created successfully",
//         data: repayment,
//         //remainingLoanBalance: remainingLoanAmount, // Add the remaining loan balance
//       };
  
//       return res.status(201).json(responseData);
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error creating loan repayment",
//         error: error.message,
//       });
//     }
//   }
  
  


//   async getLoans(req, res) {
//     try {
//       // Fetch all loans
//       const loans = await LoanService.fetch({});
      
//       return res.status(200).json({
//         success: true,
//         message: "Loans retrieved successfully",
//         data: loans,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error fetching loans",
//         error: error.message,
//       });
//     }
//   }
//   async getLoanById(req, res) {
//     try {
//       const { loanId } = req.params;

//       // Fetch the loan by ID
//       const loan = await LoanService.fetchOne({ _id: loanId });

//       if (!loan) {
//         return res.status(404).json({
//           success: false,
//           message: "Loan not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Loan retrieved successfully",
//         data: loan,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error fetching loan",
//         error: error.message,
//       });
//     }
//   }
//    // async createLoan(req, res) {
//   //   try {
//   //     const {
//   //       customerId,
//   //       amount, loanTitle,
//   //       phoneNo1,
//   //       phoneNo2,
//   //       houseAddress,
//   //       officeAddress,
//   //       maritalStatus,
//   //       currentOccupationOfApplicant,
//   //       spousePhoneNo,
//   //       spouseName,
//   //       spouseOccupation,
//   //       spouseOfficeAddress,
//   //       LoanRequestedAmount,
//   //       firstGuarantorsName,
//   //       firstGuarantorsSex,
//   //       firstGuarantorsDateOfBirth,
//   //       firstGuarantorsPhoneNumber,
//   //       firstGuarantorsOccupation,
//   //       firstGuarantorsHouseAddress,
//   //       firstGuarantorsOfficeAddress,
//   //       secondGuarantorsName,
//   //       secondGuarantorsSex,
//   //       secondGuarantorsDateOfBirth,
//   //       secondGuarantorsPhoneNumber,
//   //       secondGuarantorsOccupation,
//   //       secondGuarantorsHouseAddress,
//   //       secondGuarantorsOfficeAddress, 
//   //       interestRate,
//   //       loanDuration,
//   //       loanStartDate,
//   //       loanEndDate,
//   //       repaymentSchedule,
//   //       // ...other loan details...
//   //     } = req.body;

//   //     // Verify that the customer exists
//   //     const customer = await CustomerService.fetchOne({ _id: customerId });

//   //     if (!customer) {
//   //       return res.status(404).json({
//   //         success: false,
//   //         message: "Customer not found",
//   //       });
//   //     }

//   //     // Calculate the interest amount based on the loan amount and interest rate
//   //     const interestAmount = (parseFloat(amount) + parseFloat(interestRate)) / 100;

//   //     // Create a new loan record with the provided data
//   //     const loan = await LoanModel.create({
//   //       amount: parseFloat(amount),
//   //       interestRate: parseFloat(interestRate),
//   //       loanDuration,
//   //       loanStartDate,
//   //       loanEndDate,
//   //       repaymentSchedule,
//   //       loanTitle,
//   //       phoneNo1,
//   //       phoneNo2,
//   //       houseAddress,
//   //       officeAddress,
//   //       maritalStatus,
//   //       currentOccupationOfApplicant,
//   //       spousePhoneNo,
//   //       spouseName,
//   //       spouseOccupation,
//   //       spouseOfficeAddress,
//   //       LoanRequestedAmount,
//   //       firstGuarantorsName,
//   //       firstGuarantorsSex,
//   //       firstGuarantorsDateOfBirth,
//   //       firstGuarantorsPhoneNumber,
//   //       firstGuarantorsOccupation,
//   //       firstGuarantorsHouseAddress,
//   //       firstGuarantorsOfficeAddress,
//   //       secondGuarantorsName,
//   //       secondGuarantorsSex,
//   //       secondGuarantorsDateOfBirth,
//   //       secondGuarantorsPhoneNumber,
//   //       secondGuarantorsOccupation,
//   //       secondGuarantorsHouseAddress,
//   //       secondGuarantorsOfficeAddress, 
//   //       // ...other loan details...
//   //       customer: customer._id,
//   //       balance: parseFloat(amount) + interestAmount, // Initialize balance with the full loan amount + interest
//   //       status: "disbursed", // You can set the initial status here
//   //       type: "disbursement",
//   //     });

//   //     return res.status(201).json({
//   //       success: true,
//   //       message: "Loan created and disbursed successfully",
//   //       data: loan,
//   //     });
//   //   } catch (error) {
//   //     return res.status(500).json({
//   //       success: false,
//   //       message: "Error creating loan",
//   //       error: error.message,
//   //     });
//   //   }
//   // }


//  }
// module.exports = new LoanController();



