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
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionModel", TransactionSchema);
