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
 
  
  async searchTransactionsByDate(startDate, endDate) {
    try {
      // Query transactions within the provided date range
      const transactions = await TransactionModel.find({
        paymentDate: {
          $gte: startDate,
          $lt: endDate,
        },
      });
  
      return transactions;
    } catch (error) {
      throw new Error(`Error fetching transactions by date: ${error.message}`);
    }
  }
  async searchDepositCashByDate(startDate, endDate) {
  try {
    // Query transactions within the provided date range and collected via cash
    const transactions = await TransactionModel.find({
      type: 'deposit',
      modeOfPayment: 'cash', // Add this condition for cash transactions
      paymentDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return transactions;
  } catch (error) {
    throw new Error(`Error searching deposit cash transactions by date: ${error.message}`);
  }
}

}

module.exports = new TransactionService();