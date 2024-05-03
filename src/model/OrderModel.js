const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    status: { type: Boolean, required: true },
    kho: { type: mongoose.Schema.Types.ObjectId, ref: "Kho", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    detail: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    created_on: { type: Date, default: Date.now },
  },
  {
    timeStamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
