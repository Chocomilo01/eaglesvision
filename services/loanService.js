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
}

module.exports = new LoanService();
