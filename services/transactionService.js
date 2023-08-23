const TransactionModel = require("../model/transactionModel");

  // Implement other CRUD operations as needed
class TransactionService {
  async create(transactionData) {
    return await TransactionModel.create(transactionData);
  }

  async fetch(filter) {
    return await TransactionModel.find(filter);
  }

async createWithdrawal(transactionData) {
    return await TransactionModel.create(transactionData);
  }
  
  
}

module.exports = new TransactionService();
