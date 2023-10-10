const cron = require('node-cron');
const LoanService = require('../services/loanService');

// Define the cron job schedule (e.g., run daily at midnight)
cron.schedule('0 0 * * *', async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find all loans that are overdue
    const overdueLoans = await LoanService.getOverdueLoans(currentDate);

    // Update the status of overdue loans to 'defaulter'
    for (const loan of overdueLoans) {
      loan.status = 'defaulter';
      await loan.save();
    }

    console.log('Loan status updated for overdue loans.');
  } catch (error) {
    console.error('Error updating loan status:', error);
  }
});