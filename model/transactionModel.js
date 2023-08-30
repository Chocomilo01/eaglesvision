const mongoose = require("mongoose");




const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerModel", // Reference to the Customer model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // Reference to the User model
    },
    choose: {
      type: String, emum: ["debit", "credit"],
    },
    collectedBy: {
      type: String,
    },
    description: {
      type: String,
    },
    paymentDate: {
      type: String,
    },
    modeOfPayment: {
      type: String, emum: ["cash", "transfer"],
    },

   
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionModel", TransactionSchema);
