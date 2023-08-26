const TransactionService = require("../services/transactionService");
const CustomerService = require("../services/customerService");

class TransactionController {
  
// Inside the createDeposit method
async createDeposit(req, res) {
  try {
    const { customerId, amount, description,
      
      collectedBy,
      modeOfPayment,
      paymentDate, } = req.body;

    // Verify that the customer exists
    const customer = await CustomerService.fetchOne({ _id: customerId });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Fetch user information (user ID and user name) from your authentication system or user service
    const userId = req.body.id; 
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;

    // Convert the amount to a number
    const depositAmount = parseFloat(amount);

    // Create a deposit transaction
    const depositTransaction = await TransactionService.create({
      type: "deposit",
      amount: depositAmount, // Use the parsed amount here
      customer: customer._id,
      // firstName,
      // middleName,
      description,
      choose: "credit",
      collectedBy,
      modeOfPayment,
      paymentDate,
    });

    // Update the customer's account balance by adding the deposit amount
    customer.accountBalance += depositAmount;
    await customer.save();

    const updatedBalance = customer.accountBalance;
    const responsePayload = {
      transaction: depositTransaction,
      balance: updatedBalance,
      user: {
        id: userId,
        firstName: firstName,
        middleName: middleName,
      },
    };

    return res.status(201).json({
      success: true,
      message: "Deposit created successfully",
      data: responsePayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating deposit",
      error: error.message,
    });
  }
}



async createWithdrawal(req, res) {
  try {
    const { customerId, amount } = req.body;

    // Verify that the customer exists
    const customer = await CustomerService.fetchOne({ _id: customerId });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check if the customer has sufficient balance for the withdrawal
    if (customer.accountBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient funds for withdrawal",
      });
    }

    // Fetch user information (user ID and user name) from your authentication system or user service
    const userId = req.body.id; 
    const firstName = req.body.firstNameame;
    const middleName = req.body.middleNameame; // Replace with how you retrieve the user name

    // Create a withdrawal transaction with user information
    const withdrawalTransaction = await TransactionService.createWithdrawal({
      type: "withdrawal",
      amount,
      customer: customer._id,
      userId, // Include the user ID
      firstName, // Include the user name
      middleName,
    });

    // Update the customer's account balance
    customer.accountBalance -= amount;
    await customer.save();

    // Include user information in the response
    const updatedBalance = customer.accountBalance;
    const responsePayload = {
    transaction: withdrawalTransaction,
    balance: updatedBalance,
      user: {
        id: userId,
        firstName: firstName,
        middleName: middleName,
         // Include the updated balance
      },
    };
    
    return res.status(201).json({
      success: true,
      message: "Withdrawal created successfully",
      data: responsePayload,
    });
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating withdrawal",
      error: error.message,
    });
  }
}


  // Implement similar methods for withdrawals, transaction history, etc.
}

module.exports = new TransactionController();