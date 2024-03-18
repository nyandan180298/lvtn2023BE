const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    oID: { type: String, required: true, unique: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, require: true },
  },
  {
    timeStamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
