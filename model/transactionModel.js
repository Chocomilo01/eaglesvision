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
    name: {
      type: String,
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
    uploadedBy: {
      type: String,
    },
    AccountOfficer: {
      type: String,
    },
    description: {
      type: String,
    },
    paymentDate: {
      // type: String, // Change the type to Date
      type: Date,
    },
    modeOfPayment: {
      type: String, emum: ["cash", "transfer"],
    },
    balance: {
      type: Number
    },
  },
  { timestamps: true }
);

TransactionSchema.index({ type: 1, amount: 1, customer: 1, paymentDate: 1 }, { unique: true });

module.exports = mongoose.model("TransactionModel", TransactionSchema);
