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

async getTotalDepositByTransferByPaymentDate(req, res) {
    try {
      const { startDate, endDate } = req.query;

      // Check if startDate and endDate are provided
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "Please provide both startDate and endDate for the search.",
        });
      }

      // Parse the input date strings into JavaScript Date objects
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      // Call the service method to retrieve total deposit transactions made by transfer by payment date
      const totalDepositAmount = await TransactionService.getTotalDepositByTransferByPaymentDate(
        parsedStartDate,
        parsedEndDate
      );

      // Return the total deposit amount in the response
      return res.status(200).json({
        success: true,
        message: "Total deposit transactions made by transfer retrieved successfully",
        data: {
          totalDepositAmount,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving total deposit transactions by transfer by payment date",
        error: error.message,
      });
    }
  }

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
    const totalDepositAmount = await TransactionModel.aggregate([
      {
        $match: {
          type: 'deposit',
          choose: 'credit',
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
    throw new Error(`Error calculating total deposit amount: ${error.message}`);
  }
}


// }
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


// async getTotalDepositsByTransfer(startDate, endDate) {
//   try {
//     // Query deposit transactions with modeOfPayment set to 'transfer' and paymentDate within the specified range
//     const totalDeposits = await TransactionModel.aggregate([
//       {
//         $match: {
//           type: 'deposit',
//           modeOfPayment: 'transfer',
//           paymentDate: {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: '$amount' },
//         },
//       },
//     ]);

//     // If there are results, return the total deposit amount; otherwise, return 0.
//     if (totalDeposits.length > 0) {
//       return totalDeposits[0].totalAmount;
//     } else {
//       return 0;
//     }
//   } catch (error) {
//     throw new Error(`Error retrieving total deposit transactions: ${error.message}`);
//   }
// }


}

module.exports = new TransactionService();