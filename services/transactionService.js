const TransactionModel = require("../model/transactionModel");

  // Implement other CRUD operations as needed
class TransactionService {
  async create(transactionData) {
    return await TransactionModel.create(transactionData);
  }

  async fetch(filter) {
    return await TransactionModel.find(filter)
  }
  async getAllDeposits() {
    try {
      // Query all transactions with type "deposit"
      const deposits = await TransactionModel.find({ type: 'deposit' });

      return deposits;
    } catch (error) {
      throw new Error(`Error fetching deposit transactions: ${error.message}`);
    }
  }
  async getDepositById(depositId) {
    try {
      const deposit = await TransactionModel.findById(depositId);
      return deposit;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  // WITHDRAWALS
async createWithdrawal(transactionData) {
    return await TransactionModel.create(transactionData);
  }
  async getAllWithdrawals() {
    try {
      // Query the database for all withdrawal transactions
      const withdrawals = await TransactionModel.find({ type: 'withdrawal' });

      return withdrawals;
    } catch (error) {
      // Handle the error here if needed
      throw error;
    }
  }
  async getWithdrawalById(withdrawalId) {
    try {
      // Query the database for the withdrawal transaction by its ID
      const withdrawal = await TransactionModel.findById(withdrawalId);

      return withdrawal;
    } catch (error) {
      // Handle the error here if needed
      throw error;
    }
  }
 
  
  async searchTransactionsByDate(date) {
    try {
      // Convert the date string to a JavaScript Date object
      const searchDate = new Date(date);

      // Query transactions with the provided date
      const transactions = await TransactionModel.find({
        paymentDate: {
          $gte: searchDate, // Greater than or equal to the provided date
          $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000), // Less than the next day
        },
      });

      return transactions;
    } catch (error) {
      throw new Error(`Error fetching transactions by date: ${error.message}`);
    }
  }
  
  // ... other methods ...
}

module.exports = new TransactionService();