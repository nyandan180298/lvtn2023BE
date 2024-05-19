const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    is_confirm: { type: Boolean, required: true, default: 1 },
    // 0: huy, 1: dang giao, 2: hoan thanh
    status: { type: Number, required: true, default: 1 },
    kho: { type: mongoose.Schema.Types.ObjectId, ref: "Kho", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    detail: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    created_on: { type: Date, default: Date.now },
  },
  {
    timeStamps: true,
  }
);
// Create text indexs
orderSchema.index({ address: 'text' });

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
