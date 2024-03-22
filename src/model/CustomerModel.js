const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  vip: {type: String, require: true}
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
