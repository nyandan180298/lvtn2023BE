const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    cID: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: false },
    // idNumber: { type: Number, required: false, unique: true },
    accessToken: { type: String, require: false },
    refreshToken: { type: String, require: false },
  },
  {
    timeStamps: true,
  }
);
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
