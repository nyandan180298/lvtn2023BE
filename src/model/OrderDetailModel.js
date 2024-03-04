const mongoose = require("mongoose");
const orderDetailSchema = new mongoose.Schema(
  {
    odID: { type: String, required: true, unique: true },
    customerName: { type: String, required: true},
    phoneNum: { type: Number, required: true},
    address: { type: String, required: true},
    status: { type: Boolean, required: true },
    totalPrice: { type: Number, required: true },
    totalOrders: { type: Number, required: true },
    CID: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);
const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
module.exports = OrderDetail;
