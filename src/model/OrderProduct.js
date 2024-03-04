const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    oID: { type: String, required: true, unique: true },
    pID: { type: String, required: true },
    Quantity: { type: Number, required: true },
  },
  {
    timeStamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;