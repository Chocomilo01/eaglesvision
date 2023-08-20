const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true,
     _id: mongoose.Types.ObjectId,
      minLength: 3, maxLength: 30 },
  occupation: { type: String, required: true},
  placeOfBirth: { type: String, required: true},
  dateOfBirth: {type: String, required: true },
  sex: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Value of gender must be one of male, female, or other."
    }
  },
  zip: {
    type: String
  },
  customersPhoneNo: {
    type: String,
    required: true,
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
    required: true,
  },
  bankAccountNo:{
    type: String,
    required: true,
},
bankAccountName:{
    type: String,
    required: true,
},
nextOfKin:{
    type: String,
    required: true,
},
nextOfKinPhone:{
    type: String,
    required: true,
},
contactAddress:{
    type: String,
    required: true,
},
bvn:{
    type: String,
    required: true,
},
maritalStatus:{
    type: String,
    required: true,
},
  
}, {timestamps: true});

module.exports = User = mongoose.model('CustomerModel', CustomerSchema);
