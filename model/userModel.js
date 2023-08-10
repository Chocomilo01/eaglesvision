const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    enum: ["account Officer", "assstant manager", "dpo"],
    default: "account Officer",

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
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"]
 },
  
}, {timestamps: true});

module.exports = mongoose.model("UserModel", UserSchema);