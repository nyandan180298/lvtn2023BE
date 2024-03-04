const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    cID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNum: { type: Number, required: true },
    address: { type: String, required: true },
    idNumber: { type: Number, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);
const Customer = mongoose.model("User", customerSchema);
module.exports = Customer;
