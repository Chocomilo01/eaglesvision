const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 3, maxLength: 30 },
  middleName: { type: String, required: true, minLength: 3, maxLength: 30 },
  lastName: { type: String, required: true, minLength: 3, maxLength: 30 },
  sex: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minLength: 8,
    maxLength: 11,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 200,
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 266,
    unique: true,
  },
  roles: {
    type: String,
    required: false,
    enum: ["accountOfficer", "assistantManager", "dpo"],
    default: "accountOfficer",

  },
  bvn: {
    type: Number,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 10,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  passport: {
    data: Buffer,
     type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
  default: "active"
 },
  
}, {timestamps: true});


const User = mongoose.model("UserModel", userSchema);

exports.User = User;