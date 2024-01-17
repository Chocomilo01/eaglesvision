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
      
      // The information here would be better gotten from the jwt token
      const userId = req.body.id;
      const firstName = req.body.firstName;
      const middleName = req.body.middleName;

      // Convert the amount to a number
      const depositAmount = parseFloat(amount);

      customer.accountBalance += depositAmount;
      await customer.save();

      const updatedBalance = customer.accountBalance;

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
        balance: updatedBalance,
      });

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
        data: responsePayload
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating deposit",
        error: error.message
      });
    }
  }

  async createWithdrawal(req, res) {
    try {
      const { customerId, amount, description, paymentDate, collectedBy } = req.body;

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
      // Get user identity from jwt
      const userId = req.body.id;
      const firstName = req.body.firstNameame;
      const middleName = req.body.middleNameame; // Replace with how you retrieve the user name


      // Update the customer's account balance
      customer.accountBalance -= amount;
      await customer.save();

      const updatedBalance = customer.accountBalance;

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
        balance: updatedBalance,
        //AccountOfficer: userId,
      });

      // Include user information in the response
      const responsePayload = {
        transaction: withdrawalTransaction,
        balance: updatedBalance,
        // This aspect won't work cause the info wasn't passed in well
        user: {
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

  async searchTransactionsByPaymentDate(req, res) {
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
  
      // Call the service method to search transactions by payment date
      const transactions = await TransactionService.searchTransactionsByPaymentDate(
        parsedStartDate,
        parsedEndDate
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
        message: "Error searching transactions by payment date",
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

  async getTotalDepositByCashByPaymentDate(req, res) {
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
  
      // Call the service method to retrieve total deposit transactions made by cash by payment date
      const totalDepositAmount = await TransactionService.getTotalDepositByCashByPaymentDate(
        parsedStartDate,
        parsedEndDate
      );
  
      // Return the total deposit amount in the response
      return res.status(200).json({
        success: true,
        message: "Total deposit transactions made by cash retrieved successfully",
        data: {
          totalDepositAmount,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving total deposit transactions by cash by payment date",
        error: error.message,
      });
    }
  }


    async getTotalWithdrawalsByTransferByPaymentDate(req, res) {
      try {
        const { startDate, endDate } = req.query;
  
        if (!startDate || !endDate) {
          return res.status(400).json({
            success: false,
            message: "Please provide both startDate and endDate for the search.",
          });
        }
  
        const totalWithdrawalsAmount = await TransactionService.getTotalWithdrawalsByTransferByPaymentDate(
          new Date(startDate),
          new Date(endDate)
        );
  
        return res.status(200).json({
          success: true,
          message: "Total withdrawal transactions made by transfer retrieved successfully",
          data: {
            totalWithdrawalsAmount,
          },
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error retrieving total withdrawal transactions by transfer by payment date",
          error: error.message,
        });
      }
    }

    async getTotalWithdrawalsByCashByPaymentDate(req, res) {
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
  
        // Call the service method to retrieve total withdrawal transactions made by cash by payment date
        const totalWithdrawalsAmount = await TransactionService.getTotalWithdrawalsByCashByPaymentDate(
          parsedStartDate,
          parsedEndDate
        );
  
        // Return the total withdrawal amount in the response
        return res.status(200).json({
          success: true,
          message: "Total withdrawal transactions made by cash retrieved successfully",
          data: {
            totalWithdrawalsAmount,
          },
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error retrieving total withdrawal transactions by cash by payment date",
          error: error.message,
        });
      }
    }
  
  
  async getAllWithdrawalsByPaymentDate(req, res) {
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

      // Call the new service method to retrieve all withdrawal transactions by payment date
      const withdrawalTransactions = await TransactionService.getAllWithdrawalsByPaymentDate(
        parsedStartDate,
        parsedEndDate
      );

      // Return the withdrawal transactions in the response
      return res.status(200).json({
        success: true,
        message: "All withdrawal transactions by payment date retrieved successfully",
        data: withdrawalTransactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving all withdrawal transactions by payment date",
        error: error.message,
      });
    }
  }
  async getTotalDepositByPaymentDate(req, res) {
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

      // Call the service method to retrieve total deposit transactions by payment date
      const totalDepositAmount = await TransactionService.getTotalDepositByPaymentDate(
        parsedStartDate,
        parsedEndDate
      );

      // Return the total deposit amount in the response
      return res.status(200).json({
        success: true,
        message: "Total deposit transactions retrieved successfully",
        data: {
          totalDepositAmount,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving total deposit transactions by payment date",
        error: error.message,
      });
    }
  }


  async getAllTransactions(req, res) {
    try {
      const transactions = await TransactionService.getAllTransactions();
  
      return res.status(200).json({
        success: true,
        message: "All transactions retrieved successfully",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving all transactions",
        error: error.message,
      });
    }
}
async getAllTransactionsByCash(req, res) {
  try {
    // Call the service to get all transactions with modeOfPayment set to 'cash'
    const cashTransactions = await TransactionService.getAllTransactionsByCash();

    return res.status(200).json({
      success: true,
      message: "All transactions by cash retrieved successfully",
      data: cashTransactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving transactions by cash",
      error: error.message,
    });
  }
}

async getAllTransactionsByTransfer(req, res) {
  try {
    // Call the service to get all transactions with modeOfPayment set to 'transfer'
    const transferTransactions = await TransactionService.getAllTransactionsByTransfer();

    return res.status(200).json({
      success: true,
      message: "All transactions by transfer retrieved successfully",
      data: transferTransactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving transactions by transfer",
      error: error.message,
    });
  }
}

  async getAllTransactionsByCustomer(req, res) {
    try {
      const { customerId } = req.params;

      // Check if customerId is provided
      if (!customerId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a customerId for the search.",
        });
      }

      // Call the service method to retrieve all transactions for a customer
      const transactions = await TransactionService.getAllTransactionsByCustomer(customerId);

      return res.status(200).json({
        success: true,
        message: "Transactions retrieved successfully",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving transactions for customer",
        error: error.message,
      });
    }
  }
  


}


module.exports = new TransactionController();
