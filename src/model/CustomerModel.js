const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_num: { type: String, required: true, unique: true },
  total: {type: Number, require: true, default: 0},
  vip: {type: Number, require: true, default: 0},
  kho: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Kho"},
  orders_history: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Kho"}]
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
