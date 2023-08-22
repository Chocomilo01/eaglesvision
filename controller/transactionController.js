const CustomerService = require("../services/customerService");
const  { generateUniqueAccountNumber } = require("../utils/uniqueNumber")

class TransactionController {
async depositMoney(req, res) {
  const customerId = req.params.id;
  const { amount } = req.body;

  try {
    // Fetch the customer
    const customer = await CustomerService.fetchOne({ _id: customerId });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Ensure the amount to deposit is a positive number
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid deposit amount',
      });
    }

    // Update the account balance
    customer.accountBalance += amount;

    // Save the updated customer data
    await customer.save();

    return res.status(200).json({
      success: true,
      message: 'Money deposited successfully',
      data: {
        accountBalance: customer.accountBalance,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
 }
module.exports = new TransactionController()