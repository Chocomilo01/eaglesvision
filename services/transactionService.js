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

  async updateTransaction(id, updateData) {
    try {
      // Find the transaction by ID and update it
      const updatedTransaction = await TransactionModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // Return the updated document
      );
  
      if (!updatedTransaction) {
        throw new Error("Transaction not found");
      }
  
      return updatedTransaction;
    } catch (error) {
      throw new Error(`Error updating transaction: ${error.message}`);
    }
  }
 
  
//   async searchTransactionsByDate(startDate, endDate) {
//     try {
//       // Query transactions within the provided date range
//       const transactions = await TransactionModel.find({
//         paymentDate: {
//           $gte: startDate,
//           $lt: endDate,
//         },
//       });
  
//       return transactions;
//     } catch (error) {
//       throw new Error(`Error fetching transactions by date: ${error.message}`);
//     }
//   }
//   async searchDepositCashByDate(startDate, endDate) {
//   try {
//     // Query transactions within the provided date range and collected via cash
//     const transactions = await TransactionModel.find({
//       type: 'deposit',
//       modeOfPayment: 'cash', // Add this condition for cash transactions
//       paymentDate: {
//         $gte: startDate,
//         $lte: endDate,
//       },
//     });

//     return transactions;
//   } catch (error) {
//     throw new Error(`Error searching deposit cash transactions by date: ${error.message}`);
//   }
// }



  async searchTransactionsByPaymentDate(startDate, endDate) {
    try {
      // Use the "Transaction" model to query the database for transactions within the date range
      const transactions = await TransactionModel.find({
        paymentDate: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      return transactions;
    } catch (error) {
      throw error;
    }
  }
  async getTotalDepositByTransferByPaymentDate(startDate, endDate) {
    try {
      const totalDepositTransactions = await TransactionModel.find({
        type: 'deposit',
        modeOfPayment: "transfer",
        paymentDate: { $gte: startDate, $lt: endDate }
      });

      console.log("Hello World")
      console.log(totalDepositTransactions)

      let totalDepositAmount = 0
      totalDepositTransactions.forEach(transaction => {
        totalDepositAmount += transaction.amount
      })
      
      if (totalDepositTransactions.length > 0) {
        return totalDepositAmount;
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error(`Error calculating total deposit amount: ${error.message}`);
    }
  }

  async getTotalDepositByCashByPaymentDate(startDate, endDate) {
    try {
      const totalDepositAmount = await TransactionModel.aggregate([
        {
          $match: {
            type: 'deposit',
            modeOfPayment: 'cash',
            paymentDate: { $gte: startDate, $lt: endDate },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
          },
        },
      ]);

      if (totalDepositAmount.length > 0) {
        return totalDepositAmount[0].total;
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error(`Error retrieving total deposit transactions by cash by payment date: ${error.message}`);
    }
  }
  async getTotalWithdrawalsByCashByPaymentDate(startDate, endDate) {
    try {
      const totalWithdrawalsAmount = await TransactionModel.aggregate([
        {
          $match: {
            type: 'withdrawal',
            modeOfPayment: 'cash',
            paymentDate: { $gte: startDate, $lt: endDate },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
          },
        },
      ]);
      console.log(totalWithdrawalsAmount)
      if (totalWithdrawalsAmount.length > 0) {
        return totalWithdrawalsAmount[0].total;
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error(`Error retrieving total withdrawal transactions by cash by payment date: ${error.message}`);
    }
  }

  async getTotalWithdrawalsByTransferByPaymentDate(startDate, endDate) {
    try {
      const totalWithdrawalsAmount = await TransactionModel.aggregate([
        {
          $match: {
            type: 'withdrawal',
            // choose: 'Debit',
            modeOfPayment: 'transfer',
            paymentDate: { $gte: startDate, $lt: endDate },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
          },
        },
      ]);

      if (totalWithdrawalsAmount.length > 0) {
        return totalWithdrawalsAmount[0].total;
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error(`Error retrieving total withdrawal transactions by transfer by payment date: ${error.message}`);
    }
  }
  // New method to retrieve all withdrawal transactions by payment date
  async getAllWithdrawalsByPaymentDate(startDate, endDate) {
    try {
      // Query withdrawal transactions within the provided date range
      const transactions = await TransactionModel.find({
        type: 'withdrawal',
        paymentDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      return transactions;
    } catch (error) {
      throw new Error(`Error retrieving all withdrawal transactions by payment date: ${error.message}`);
    }
  }
  async getLoansDepositedByTransfer(startDate, endDate) {
    try {
      // Create a date range query for the paymentDate field
      const dateRangeQuery = {
        paymentDate: {
          $gte: startDate,
          $lte: endDate,
        },
      };
  
      // Query the database to find loans that are "deposits" via transfer and within the specified date range
      const transferDepositLoans = await LoanModel.find({
        $and: [
          { type: "deposit" },
          { modeOfPayment: "transfer" },
          dateRangeQuery,
        ],
      });
  
      // Calculate the total deposit amount
      const totalDepositAmount = transferDepositLoans.reduce(
        (total, loan) => total + loan.amount,
        0
      );
  
      return totalDepositAmount;
    } catch (error) {
      throw error;
    }
  }
  async getAllTransactionsByCustomer(customerId) {
    try {
      const transactions = await TransactionModel.find({ customerId });

      return transactions;
    } catch (error) {
      throw new Error(`Error retrieving transactions for customer: ${error.message}`);
    }
  }
  async getAllTransactions() {
    try {
      console.log("Hello World!")
      const transactions = await TransactionModel.find();

      return transactions;
    } catch (error) {
      throw new Error(`Error retrieving all transactions: ${error.message}`);
    }
  }
  async getAllTransactionsByCash() {
    try {
      // Query the database for all transactions with modeOfPayment set to 'cash'
      const cashTransactions = await TransactionModel.find({ modeOfPayment: 'cash' });

      return cashTransactions;
    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      throw new Error(`Error retrieving transactions by cash: ${error.message}`);
    }
  }
  async getAllTransactionsByTransfer() {
    try {
      // Query the database for all transactions with modeOfPayment set to 'transfer'
      const transferTransactions = await TransactionModel.find({
        modeOfPayment: 'transfer',
      });

      return transferTransactions;
    } catch (error) {
      throw new Error(`Error retrieving transactions by transfer: ${error.message}`);
    }
  }
  async getAllTransactionsByCollector(collectedBy) {
    try {
      const transactions = await TransactionModel.find({ collectedBy }).exec();
      return transactions;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}


module.exports = new TransactionService();