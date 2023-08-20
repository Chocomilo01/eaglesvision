const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    transaction: [
        { customerId: { type: ["credit", "debit"] }, 
        balance:{ type: String,
        enum: ["previousBalance", "currentBalance"],
        default: 0 }
        },
    ],
    amount: { type: Number, required: true},
    
    totalBalance: {type: Number, required: true}
    

  },


  { timestamps: true },
  );
  
  const Transaction = mongoose.model("Transaction", transactionSchema);
  
  exports.Transaction = Transaction;