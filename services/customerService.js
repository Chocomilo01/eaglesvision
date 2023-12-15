const CustomerModel = require("../model/customerModel");
const TransactionModel = require("../model/transactionModel");
const LoanService = require("./loanService");

class CustomerService {
  //Add a User
  async create(customerData) {
    return await CustomerModel.create(customerData);
  }

  // Updata a User
  async update(id, customerupdate) {
    return await CustomerModel.findByIdAndUpdate(id, customerupdate, {
      new: true,
    });
  }

  // delete a customer
  async delete(id) {
    return await CustomerModel.findByIdAndDelete(id);
  }

  //get a single customer
  async fetchOne(filter) {
    return await CustomerModel.findOne(filter);
  }

  // get all customer
  async fetch(filter) {
    return await CustomerModel.find(filter);
  }
  async fetch(filter) {
    const customers = await CustomerModel.find(filter);

    // // Iterate through the customers and calculate loan balance for each
    // for (const customer of customers) {
    //   const loanBalance = await LoanService.calculateTotalRepayments(customer._id);
    //   customer.loanBalance = loanBalance;
    // }

    return customers;
  }

  async getCustomerTransactions(customerId) {
    try {
      const transactions = await TransactionModel.find({ customer: customerId });
      return transactions;
    } catch (error) {
      throw error;
    }
  }
  
async searchCustomers(query) {
    try {
      return await CustomerModel.find(query);
    } catch (error) {
      throw new Error(`Error searching for customers: ${error.message}`);
    }
  }

  // async getSavingsTransactions(customerId) {
  //   try {
  //     // Filter transactions based on customer ID and type "savings"
  //     const savingsTransactions = await TransactionModel.find({
  //       customer: customerId,
  //       type: "savings",
  //     });

  //     return savingsTransactions;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = new CustomerService();