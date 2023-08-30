const TransactionModel = require("../model/transactionModel");

  // Implement other CRUD operations as needed
class TransactionService {
  async create(transactionData) {
    return await TransactionModel.create(transactionData);
  }

  async fetch(filter) {
    return await TransactionModel.find(filter)
  }

async createWithdrawal(transactionData) {
    return await TransactionModel.create(transactionData);
  }
  // async getAllDeposits() {
  //   try {
  //     const deposits = await TransactionModel.find({ type: "deposit" }).exec();
  //     return deposits;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getDepositById(depositId) {
  //   try {
  //     const deposit = await TransactionModel.findById(depositId).exec();
  //     if (!deposit) {
  //       throw new Error("Deposit not found");
  //     }
  //     return deposit;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // async getAllWithdrawals() {
  //   return TransactionModel.find({ type: "withdrawal" }).exec();
  // }
  // async getWithdrawalById(id) {
  //   return TransactionModel.findById(id).exec();
  // }
  // async getDepositsByDate(searchDate) {
  //   try {
  //     const deposits = await TransactionModel.find({
  //       type: "deposit",
  //       paymentDate: searchDate, // Adjust the field name as per your schema
  //     }).exec();
  //     return deposits;
  //   } catch (error) {
  //     throw error;
  //   }
  //}
  
}

module.exports = new TransactionService();
