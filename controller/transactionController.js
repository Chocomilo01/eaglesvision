const TransactionService = require("../services/transactionService");
const CustomerService = require("../services/customerService");

class TransactionController {
  // Inside the createDeposit method
  async createDeposit(req, res) {
    try {
      const {
        customerId,
        amount,
        description,
        collectedBy,
        modeOfPayment,
        paymentDate,
      } = req.body;

      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Fetch user information (user ID and user name) from your authentication system or user service
      const userId = req.body.id;
      const firstName = req.body.firstName;
      const middleName = req.body.middleName;

      // Convert the amount to a number
      const depositAmount = parseFloat(amount);

      // Create a deposit transaction
      const depositTransaction = await TransactionService.create({
        type: "deposit",
        amount: depositAmount, // Use the parsed amount here
        customer: customer._id,
        description,
        choose: "credit",
        collectedBy,
        modeOfPayment,
        paymentDate,
        userId: userId,
      });

      // Update the customer's account balance by adding the deposit amount
      customer.accountBalance += depositAmount;
      await customer.save();

      const updatedBalance = customer.accountBalance;
      const responsePayload = {
        transaction: depositTransaction,
        balance: updatedBalance,
        user: {
          id: userId,
          firstName: firstName,
          middleName: middleName,
        },
      };

      return res.status(201).json({
        success: true,
        message: "Deposit created successfully",
        data: responsePayload,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating deposit",
        error: error.message,
      });
    }
  }

  async createWithdrawal(req, res) {
    try {
      const { customerId, amount, description, paymentDate } = req.body;

      // Verify that the customer exists
      const customer = await CustomerService.fetchOne({ _id: customerId });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Check if the customer has sufficient balance for the withdrawal
      if (customer.accountBalance < amount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient funds for withdrawal",
        });
      }

      // Fetch user information (user ID and user name) from your authentication system or user service
      const userId = req.body.id;
      const firstName = req.body.firstNameame;
      const middleName = req.body.middleNameame; // Replace with how you retrieve the user name

      // Create a withdrawal transaction with user information
      const withdrawalTransaction = await TransactionService.createWithdrawal({
        type: "withdrawal",
        amount,
        customer: customer._id,
        userId, // Include the user ID
        firstName, // Include the user name
        middleName,
        description,
        choose: "Debit",
        paymentDate,
        collectedBy,
        user: userId,
        firstName,
        middleName,
      });

      // Update the customer's account balance
      customer.accountBalance -= amount;
      await customer.save();

      // Include user information in the response
      const updatedBalance = customer.accountBalance;
      const responsePayload = {
        transaction: withdrawalTransaction,
        balance: updatedBalance,
        collectedBy: {
          id: userId,
          firstName: firstName,
          middleName: middleName,
          // Include the updated balance
        },
      };

      return res.status(201).json({
        success: true,
        message: "Withdrawal created successfully",
        data: responsePayload,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating withdrawal",
        error: error.message,
      });
    }
  }
  async getAllDeposits(req, res) {
    try {
      // Call the service to get all deposit transactions
      const deposits = await TransactionService.getAllDeposits();

      return res.status(200).json({
        success: true,
        message: "All deposit transactions retrieved successfully",
        data: deposits,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving deposit transactions",
        error: error.message,
      });
    }
  }
  async getAllWithdrawals(req, res) {
    // Call the service to get all withdrawal transactions
    const withdrawals = await TransactionService.getAllWithdrawals();

    return res.status(200).json({
      success: true,
      message: "All withdrawal transactions retrieved successfully",
      data: withdrawals,
    });
  }
  async getWithdrawalById(req, res) {
    try {
      const withdrawalId = req.params.withdrawalId;

      // Query the database for the withdrawal transaction with the specified ID
      const withdrawal = await TransactionService.getWithdrawalById(
        withdrawalId
      );

      if (!withdrawal) {
        return res.status(404).json({
          success: false,
          message: "Withdrawal not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Withdrawal retrieved successfully",
        data: withdrawal,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving withdrawal transaction",
        error: error.message,
      });
    }
  }

  async getDepositById(req, res) {
    try {
      const depositId = req.params.depositId;
      const deposit = await TransactionService.getDepositById(depositId);

      if (!deposit) {
        return res.status(404).json({
          success: false,
          message: "Deposit not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Deposit retrieved successfully",
        data: deposit,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving deposit",
        error: error.message,
      });
    }
  }

  async searchTransactionsByDate(req, res) {
    try {
      const { date } = req.query;
      console.log("Received date:", date);

      // Check if a date parameter is provided
      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Please provide a date for the search.",
        });
      }

      // Parse the input date string into a JavaScript Date object
      const searchDate = new Date(date);
      console.log("Parsed date:", searchDate);

      // Calculate the end date by adding one day to the search date
      const endDate = new Date(searchDate);
      endDate.setDate(searchDate.getDate() + 1);

      // Use the TransactionService to search transactions by date range
      const transactions = await TransactionService.searchTransactionsByDate(
        searchDate,
        endDate
      );

      // Return the transactions in the response
      return res.status(200).json({
        success: true,
        message: "Transactions found successfully",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving transactions by date",
        error: error.message,
      });
    }
  }

  async searchDepositCashByDate(req, res) {
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

      // Call the service method to search deposit transactions
      const transactions = await TransactionService.searchDepositCashByDate(
        parsedStartDate,
        parsedEndDate
      );

      // Return the transactions in the response
      return res.status(200).json({
        success: true,
        message: "Deposit cash transactions found successfully",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error searching deposit cash transactions by date",
        error: error.message,
      });
    }
  }
}

module.exports = new TransactionController();
