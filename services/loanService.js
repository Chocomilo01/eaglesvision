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
  async calculateTotalRepayments(loanId) {
    const repayments = await LoanModel.find({
      customer: loanId,
      type: "repayment",
    });
    
    // Calculate the total repayment amount
    const totalRepayments = repayments.reduce((total, repayment) => {
      return total + repayment.amount;
    }, 0);
    
    return totalRepayments;
  }
}

module.exports = new LoanService();