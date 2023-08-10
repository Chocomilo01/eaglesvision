const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 accountHoldersName: { type: String, required: true, minLength: 3, maxLength: 30 },
  middleName: { type: String, required: true,},
  occupation: { type: String, required: true,},
  PlaceOfBirth: { type: String, required: true,},
  sex: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: false,
  },
  CustomersPhoneNo: {
    type: Number,
    required: true,
    minLength: 8,
    maxLength: 11,
  },
  maritalStatus: {
    type: String,
    required: false,
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
  meansOfIdentification: {
 type: Number,
 required: false,
  },
  bankName: {
    type: String,
    required: true,
  },
  bankAccountNo:{
    type: Number,
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
contactAddress:{
    type: String,
    required: true,
},
bvn:{
    type: Number,
    required: true,
},
maritalStatus:{
    type: String,
    required: true,
},
  
}, {timestamps: true});

module.exports = mongoose.model("UserModel", UserSchema);