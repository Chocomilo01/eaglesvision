const LoanModel = require("../model/loanModel"); // Import the Loan model

class LoanService {
  async create(loanData) {
    return await LoanModel.create(loanData);
  }

  async fetch(filter) {
    return await LoanModel.find(filter);
  }

  async fetchOne(filter) {
    return await LoanModel.findOne(filter); // Define the fetchOne function
  }
  async delete(filter) {
    return await LoanModel.deleteOne(filter); // Use deleteOne to delete a single document matching the filter
  }
  async getLoans() {
    try {
      const loans = await LoanModel.find(); // Find all loans in the database
      return loans;
    } catch (error) {
      throw error;
    }
  }
  async getLoansDepositedByCashAndPaymentDate(startDate, endDate) {
    try {
      // Create a date range query for the paymentDate field
      const dateRangeQuery = {
        paymentDate: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      // Query the database to find loans that are "deposits" and within the specified date range
      const depositLoans = await LoanModel.find({
        $and: [
          { type: "deposit" },
          dateRangeQuery,
        ],
      });

      return depositLoans;
    } catch (error) {
      throw error;
    }
  }
  
  async getOverdueLoans(currentDate) {
    try {
      // Find all loans with an "active" status and a repaymentDate in the past
      const overdueLoans = await LoanModel.find({
        status: 'active', // Adjust this based on your loan status criteria
        repaymentDate: { $lt: currentDate },
      });

      return overdueLoans;
    } catch (error) {
      throw error;
    }
  }

  async getDefaulters() {
    try {
      const defaulters = await LoanModel.find({ status: 'defaulter' });
      return defaulters;
    } catch (error) {
      throw error;
    }
  }
  async getTotalDepositAmountByCashAndDateRange(startDate, endDate) {
    try {
      const dateRangeQuery = {
        paymentDate: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      const totalDepositAmount = await LoanModel.aggregate([
        {
          $match: {
            $and: [
              { type: "deposit" },
              { modeOfPayment: "cash" },
              dateRangeQuery,
            ],
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      return totalDepositAmount.length > 0
        ? totalDepositAmount[0].totalAmount
        : 0;
    } catch (error) {
      throw error;
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

      // Query the database to find loans that are "deposits" and via "transfer" within the specified date range
      const depositLoans = await LoanModel.find({
        $and: [
          { type: "deposit" },
          { modeOfPayment: "transfer" },
          dateRangeQuery,
        ],
      });

      return depositLoans;
    } catch (error) {
      throw error;
    }
  }

  // async getTotalDepositsByTransfer() {
  //   try {
  //     // Query the database to find deposits that are made via transfer
  //     const transferDeposits = await LoanModel.find({
  //       type: "deposit",
  //       modeOfPayment: "transfer",
  //     });

  //     // Calculate the total amount of deposits made via transfer
  //     const totalTransferDeposits = transferDeposits.reduce(
  //       (total, deposit) => total + deposit.amount,
  //       0
  //     );

  //     return totalTransferDeposits;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async update(filter, updateData) {
    try {
      //  i use findOneAndUpdate to find the loan based on the filter and update its data
      const updatedLoan = await LoanModel.findOneAndUpdate(filter, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run validators to ensure updated data is valid
      });

      if (!updatedLoan) {
        throw new Error("Loan not found");
      }

      return updatedLoan;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerLoans(customerId) {
    try {
      const customerLoans = await LoanModel.find({ customer: customerId });
      return customerLoans;
    } catch (error) {
      throw error;
    }
  }
}



module.exports = new LoanService();