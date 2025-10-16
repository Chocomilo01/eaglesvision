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
  async getLoans(page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      // Fetch all loans sorted by newest first
      const loans = await LoanModel.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      const total = await LoanModel.countDocuments();

      return {
        loans,
        pagination: {
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: Number(page),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async update(filter, updateData) {
    return await LoanModel.updateOne(filter, updateData);
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
      const currentDate = new Date().toISOString(); // Get the current date in ISO format
  
      // Find all loans with an "active" status and a repaymentDate in the past
      const defaulters = await LoanModel.find({
        status: 'active',
        repaymentDate: { $lt: currentDate },
      })
      .sort({ repaymentDate: 1 }) // Sort by repaymentDate in ascending order
      .populate('customer') // Populate the customer details
      .exec();
  
      // Retrieve the next payment date from the sorted list
      const nextPaymentDate = defaulters.length > 0 ? defaulters[0].repaymentDate : null;
  
      return { defaulters, nextPaymentDate };
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
      });

      if (!updatedLoan) {
        throw new Error("Loan not found");
      }

      return updatedLoan;
    } catch (error) {
      throw error;
    }
  }

  async getLoansByCollector(collectorName) {
    try {
      // Query the database to find loans collected by the specified collectorName
      const loans = await LoanModel.find({ collectedBy: collectorName }).exec();
      return loans;
    } catch (error) {
      throw new Error(`Error fetching loans by collector: ${error.message}`);
    }
  }
  async getCustomerLoans(customerId, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      // Fetch loans belonging to this customer, sorted by newest first
      const loans = await LoanModel.find({ customer: customerId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      const total = await LoanModel.countDocuments({ customer: customerId });

      return {
        loans,
        pagination: {
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: Number(page),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // async getLoansTotals() {
  //   try {
  //     // Find all loans Given by the bank in the database
  //     const loans = await LoanModel.find({ type: {$in: ["deposit", "disbursement"]} });
  //     const repays = await LoanModel.find({ type: {$in: ["withdrawal"]} });

  //     let totalLoanRecieved = 0
  //     let totalInterestAccured = 0
  //     let totalLoanRepaid = 0
  //     loans.forEach((loan) =>{
  //       totalLoanRecieved += parseFloat(loan.amount)
  //       // totalInterestAccured += loan.interestRate
  //     })

  //     repays.forEach((repay) =>{
  //       totalLoanRepaid += parseFloat(repay.amount)
  //       // totalInterestAccured += loan.interestRate
  //     })

  //     totalLoanRecieved -= 18000000;

  //     return { totalLoanRecieved, totalInterestAccured, totalLoanRepaid };

  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getLoansTotals(customerId) {
  //   const loans = await LoanModel.find({ customer: customerId });
  //   let totalLoanRecieved = 0;
  //   let totalInterestAccured = 0;
  //   let totalLoanRePaid = 0;

  //   loans.forEach(loan => {
  //     totalLoanRecieved += parseFloat(loan.totalLoanRecieved);
  //     totalInterestAccured += parseFloat(loan.totalInterestAccured);
  //     totalLoanRePaid += parseFloat(loan.totalLoanRePaid);
  //   });

  //   return {
  //     totalLoanRecieved,
  //     totalInterestAccured,
  //     totalLoanRePaid,
  //   };
  // }


  async getLoansTotals() {
    try {
      // Find all loans Given by the bank in the database
      const loans = await LoanModel.find({ type: {$in: ["deposit", "disbursement"]} });
      const repays = await LoanModel.find({ type: {$in: ["withdrawal"]} });
  
      let totalLoanRecieved = 0;
      let totalInterestAccured = 0;
      let totalLoanRepaid = 0;
  
      loans.forEach((loan) => {
        totalLoanRecieved += parseFloat(loan.amount);
         totalInterestAccured += parseFloat(loan.interestRate);
      });
  
      repays.forEach((repay) => {
        totalLoanRepaid += parseFloat(repay.amount);
        // totalInterestAccured += loan.interestRate;
      });

      
  
      // totalLoanRecieved -= 18000000;  // Subtract 18,000,000 from totalLoanReceived
  
      return { totalLoanRecieved, totalInterestAccured, totalLoanRepaid };
  
    } catch (error) {
      throw error;
    }
  }
  
  
  // async findAndDeleteDuplicateLoans() {
  //   try {
  //     const loans = await LoanModel.find();
  //     const duplicateLoans = loans.filter((loan, index, self) =>
  //       index !== self.findIndex((t) => (
  //         t.customerId === loan.customerId && t.amount === loan.amount
  //       ))
  //     );

  //     const duplicateIds = duplicateLoans.map(loan => loan._id);

  //     // Delete duplicate loans
  //     await LoanModel.deleteMany({ _id: { $in: duplicateIds } });

  //     return duplicateIds;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // async findAndDeleteDuplicateLoans() {
  //   try {
  //     const loans = await LoanModel.find();
  //     const duplicateLoans = loans.filter((loan, index, self) =>
  //       index !== self.findIndex((t) => (
  //         t.customerId === loan.customerId && t.amount === loan.amount
  //       ))
  //     );

  //     const duplicateIds = duplicateLoans.map(loan => loan._id);

  //     // Delete duplicate loans
  //     await LoanModel.deleteMany({ _id: { $in: duplicateIds } });

  //     return duplicateIds;
  //   } catch (error) {
  //     throw error;
  //   }
  // 
  async update(filter, updateData) {
    try {
      // Fetch the current loan data
      const currentLoan = await LoanModel.findOne(filter);
      if (!currentLoan) {
        throw new Error("Loan not found");
      }

      // Calculate the new balance based on the transaction type
      let newBalance = currentLoan.totalLoanRecieved + currentLoan.totalInterestAccured - currentLoan.totalLoanRePaid;
      if (updateData.type === 'deposit') {
        newBalance += parseFloat(updateData.amount) + parseFloat(updateData.interestRate);
      } else if (updateData.type === 'withdrawal') {
        newBalance -= parseFloat(updateData.amount) + parseFloat(updateData.interestRate);
      }

      // Update the loan with the new balance and other details
      const updatedLoan = await LoanModel.findOneAndUpdate(
        filter,
        {
          ...updateData,
          balance: newBalance,
        },
        { new: true } // Return the updated document
      );

      if (!updatedLoan) {
        throw new Error("Loan not found");
      }

      return updatedLoan;
    } catch (error) {
      throw error;
    }
  }
  
  

}



module.exports = new LoanService();