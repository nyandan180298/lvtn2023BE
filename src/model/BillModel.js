const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    billID: { type: String, required: true, unique: true },
    odID: { type: String, required: true},
    type: { type: Number, required: true},
    price: { type: Number, required: true},
    status: { type: Boolean, required: false },
    date: { type: DateTime, required: false },
  },
  {
    timeStamps: true,
  }
);
const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
