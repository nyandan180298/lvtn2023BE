const mongoose = require("mongoose");
const orderDetailSchema = new mongoose.Schema(
  {
    odID: { type: String, required: true, unique: true },
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    status: { type: Boolean, required: true },
    orders: {
      order: { type: Schema.Types.ObjectId, ref: "Order" },
      totalPrice: { type: Number, required: true },
      totalOrders: { type: Number, required: true },
    },
  },
  {
    timeStamps: true,
  }
);
const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
module.exports = OrderDetail;
