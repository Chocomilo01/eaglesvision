const TransactionService = require("../services/transactionService");
const CustomerService = require("../services/customerService");

class TransactionController {
  async createDeposit(req, res) {
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

      // Create a deposit transaction
      const depositTransaction = await TransactionService.create({
        type: "deposit",
        amount,
        customer: customer._id,
      });

      // Update the customer's account balance
      customer.accountBalance += amount;
      await customer.save();

      return res.status(201).json({
        success: true,
        message: "Deposit created successfully",
        data: depositTransaction,
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
  
      // Create a withdrawal transaction
      const withdrawalTransaction = await TransactionService.createWithdrawal({
        type: "withdrawal",
        amount,
        customer: customer._id,
      });
  
      // Update the customer's account balance
      customer.accountBalance -= amount;
      await customer.save();

      // Include the updated account balance in the response
    const updatedBalance = customer.accountBalance;
  
      return res.status(201).json({
        success: true,
        message: "Withdrawal created successfully",
        data: withdrawalTransaction,
        balance: updatedBalance, // Include the updated balance
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
