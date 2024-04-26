const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    status: { type: Boolean, required: true },
    detail: {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, require: true },
      price: { type: Number, required: true },
      discount: { type: Number },
    },
  },
  {
    timeStamps: true,
  }
);
const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
module.exports = { Order, OrderDetail };
