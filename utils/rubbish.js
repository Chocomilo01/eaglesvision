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

