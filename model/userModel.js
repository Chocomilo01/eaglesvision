const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    enum: ["superAdmin", "manager", "accountManager", "accountOfficer", "dpo"],
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

// Encrypt password before pushing to database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.matchPassword = async function (password) {
  if(!password) throw new Error("Password is missing, can not compare");

  try{
    const result = await bcrypt.compare(password, this.password)
    return result;
  } catch (e) {
      throw new Error('Error while comparing password: ' + e.message);
  }
};

const userModel = mongoose.model("UserModel", userSchema);

module.exports = userModel;