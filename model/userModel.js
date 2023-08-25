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


//const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, minlength: 3, maxlength: 30 },
//   middleName: { type: String, required: true, minlength: 3, maxlength: 30 },
//   lastName: { type: String, required: true, minlength: 3, maxlength: 30 },
//   sex: { type: String, required: true },
//   phone: { type: String, required: true, minlength: 8, maxlength: 11 },
//   password: { type: String, required: true, minlength: 6, maxlength: 200 },
//   email: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 266,
//     unique: true,
//     validate: {
//       validator: (value) => {
//         // Use a regular expression or validator library to validate email format
//         // Return true for valid emails, false otherwise
//       },
//       message: "Invalid email address",
//     },
//   },
//   roles: {
//     type: [String],
//     required: false,
//     enum: ["accountOfficer", "assistantManager", "dpo"],
//     default: ["accountOfficer"],
//   },
//   bvn: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
//   homeAddress: { type: String, required: true },
//   passport: { type: String }, // Store reference to the image file
//   isActive: { type: Boolean, default: true }, // Use a boolean for status
// }, { timestamps: true });

// const User = mongoose.model("UserModel", userSchema);

// exports.User = User;


exports.User = User;