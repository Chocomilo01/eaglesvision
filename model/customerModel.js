const mongoose = require("mongoose");
const { generateUniqueAccountNumber } = require("../utils/uniqueNumber");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, 
      required: true 
    },
    picture: {
      type: String, // Assuming you store the path or URL of the image
      required: false // Adjust as needed based on your requirements
    },
    occupation: { type: String, 
      // required: true 
    },
    placeOfBirth: { type: String, 
      // required: true 
    },
    dateOfBirth: { type: String,
      //  required: true 
      },
    sex: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Value of gender must be one of male, female, or other.",
      },
      accountNumber: {
        type: String,
        // required: true,
      },
      amount: {
        type: Number,
        // required: true,
      },
    },
    zip: {
      type: String,
    },
    customersPhoneNo: {
      type: String,
      unique: true,
      minLength: 8,
      maxLength: 11,
    },
    spouseName: {
      type: String,
      required: false,
    },
    spousePhoneNo: {
      type: String,
      required: false,
    },
    loanBalance: {
      type: Number,
      default: 0
    },
    meansOfIdentification: {
      type: String,
      required: false,
    },
    meansOfIdentificationNumber: {
      type: String,
      required: false,
    },
    bankName: {
      type: String,
      // required: true,
    },
    bankAccountNo: {
      type: String,
      // required: true,
    },
    bankAccountName: {
      type: String,
      // required: true,
    },
    nextOfKin: {
      type: String,
      // required: true,
    },
    nextOfKinPhone: {
      type: String,
      // required: true,
    },
    contactAddress: {
      type: String,
      // required: true,
    },
    bvn: {
      type: String,
      unique: true,
      sparse: true,
      required: false,
    },
    maritalStatus: {
      type: String,
      // required: true,
    },
    accountNumber: {
      type: String,
      unique: true,
      default: `${generateUniqueAccountNumber}`
    },
    accountBalance: {
      type: Number,
      default: 0, // Initial balance is set to 
    },
    officerIncharge: {
      type: String,
    },
    uploadedBy: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerModel", CustomerSchema);
