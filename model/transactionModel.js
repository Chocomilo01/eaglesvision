const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // ...other fields...
  accountBalance: {
    type: Number,
    default: 0, // Initial balance is set to 0
  },
}, { timestamps: true });

module.exports = mongoose.model('TransactionModel', TransactionSchema);