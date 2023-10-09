const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {
    amount: { type: String, required: true },
    interestRate: { type: String, required: true },
    loanDuration: { type: String },
    loanStartDate: { type: String, required: true },
    loanEndDate: { type: String, required: true },
    repaymentSchedule: { type: String },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerModel", // Reference to the Customer model
      required: true,
    },
    loanTitle: { type: String },
    phoneNo1: { type: String },
    phoneNo2: { type: String },
    houseAddress: { type: String },
    officeAddress: { type: String },
    maritalStatus: { type: String },
    currentOccupationOfApplicant: { type: String },
    spousePhoneNo: { type: String },
    spouseName: { type: String },
    spouseOccupation: { type: String },
    spouseOfficeAddress: { type: String },
    LoanRequestedAmount: { type: Number },
    firstGuarantorsName: { type: String },
    firstGuarantorsSex: { type: String },
    firstGuarantorsDateOfBirth: { type: String },
    firstGuarantorsPhoneNumber: { type: String },
    firstGuarantorsOccupation: { type: String },
    firstGuarantorsHouseAddress: { type: String },
    firstGuarantorsOfficeAddress: { type: String },
    secondGuarantorsName: { type: String },
    secondGuarantorsSex: { type: String },
    secondGuarantorsDateOfBirth: { type: String },
    secondGuarantorsPhoneNumber: { type: String },
    secondGuarantorsOccupation: { type: String },
    secondGuarantorsHouseAddress: { type: String },
    secondGuarantorsOfficeAddress: { type: String },
    status: {
      type: String,
      enum: ["disbursed", "deposited", "withdrawn", "active", "defaulter"],
      required: true,
    },
    balance: {
      type: Number,
      default: 0, // Set a default value of 0 for balance
    },

    type: {
      type: String,
      enum: ["disbursement", "deposit", "withdrawal"],
      required: true,
    },
    repaymentDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoanModel", LoanSchema);
