// const TransactionService = require("../services/transactionService");
// const CustomerService = require("../services/customerService");

// class TransactionController {
//   async createDeposit(req, res) {
//     try {
//       const { customerId, amount } = req.body;

//       // Verify that the customer exists
//       const customer = await CustomerService.fetchOne({ _id: customerId });

//       if (!customer) {
//         return res.status(404).json({
//           success: false,
//           message: "Customer not found",
//         });
//       }
//        // Fetch user information (user ID and user name) from your authentication system or user service
//     const userId = req.body.id; 
//     const firstName = req.body.firstNameame;
//     const middleName = req.body.middleNameame;

//       // Create a deposit transaction
//       const depositTransaction = await TransactionService.create({
//         type: "deposit",
//         amount,
//         customer: customer._id,
//         firstName,
//         middleName,

//       });

//       // Update the customer's account balance
//       accountBalance += amount;
//       await customer.save();
      

//     const updatedBalance = customer.accountBalance;
//     const responsePayload = {
//     transaction: depositTransaction,
//     balance: updatedBalance,
//       user: {
//         id: userId,
//         firstName: firstName,
//         middleName: middleName,
//          // Include the updated balance
//       },
//     };

//       return res.status(201).json({
//         success: true,
//         message: "Deposit created successfully",
//         data: responsePayload,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error creating deposit",
//         error: error.message,
//       });
//     }
//   }
//   // transactionController.js

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

//     // Fetch user information (user ID and user name) from your authentication system or user service
//     const userId = req.body.id; 
//     const firstName = req.body.firstNameame;
//     const middleName = req.body.middleNameame; // Replace with how you retrieve the user name

//     // Create a withdrawal transaction with user information
//     const withdrawalTransaction = await TransactionService.createWithdrawal({
//       type: "withdrawal",
//       amount,
//       customer: customer._id,
//       userId, // Include the user ID
//       firstName, // Include the user name
//       middleName,
//     });

//     // Update the customer's account balance
//     customer.accountBalance -= amount;
//     await customer.save();

//     // Include user information in the response
//     const updatedBalance = customer.accountBalance;
//     const responsePayload = {
//     transaction: withdrawalTransaction,
//     balance: updatedBalance,
//       user: {
//         id: userId,
//         firstName: firstName,
//         middleName: middleName,
//          // Include the updated balance
//       },
//     };
    
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


//   // Implement similar methods for withdrawals, transaction history, etc.
// }

// module.exports = new TransactionController();
