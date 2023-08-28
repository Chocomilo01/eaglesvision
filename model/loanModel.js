const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    loanDuration: { type: String },
    loanStartDate: { type: String, required: true },
    loanEndDate: { type: String, required: true },
    repaymentSchedule: { type: String },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerModel", // Reference to the Customer model
      required: true,
    },
    loanTitle: {type: String},
    phoneNo1: {type: Number},
    phoneNo2: {type: Number},
    houseAddress: {type: String},
    officeAddress: {type: String},
    maritalStatus: {type: String},
    currentOccupationOfApplicant: {type: String},
    spousePhoneNo: {type: Number},
    spouseName: {type: String},
    spouseOccupation: {type: String},
    spouseOfficeAddress: {type: String},
    LoanRequestedAmount: {type: Number},
    firstGuarantorsName: {type: String},
    firstGuarantorsSex: {type: String},
    firstGuarantorsDateOfBirth: {type: String},
    firstGuarantorsPhoneNumber: {type: String},
    firstGuarantorsOccupation: {type: String},
    firstGuarantorsHouseAddress: {type: String},
    firstGuarantorsOfficeAddress: {type: String},
    secondGuarantorsName: {type: String},
    secondGuarantorsSex: {type: String},
    secondGuarantorsDateOfBirth: {type: String},
    secondGuarantorsPhoneNumber: {type: String},
    secondGuarantorsOccupation: {type: String},
    secondGuarantorsHouseAddress: {type: String},
    secondGuarantorsOfficeAddress: {type: String},
    // status: {
    //   type: String,
    //   enum: ["disbursed", "repaid"], required: true,
    // },
    type: {
      type: String,
      enum: ["disbursement", "repayment"],
      required: true,
    },
     repaymentDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoanModel", LoanSchema);