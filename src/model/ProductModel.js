const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    p_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    nguon_nhap: { type: mongoose.Schema.Types.ObjectId, ref: "NguonNhap" },
    ngay_nhap: { type: Date, required: true },
    han_sd: { type: Date, require: true },
    image: { type: Buffer, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    kho: { type: mongoose.Schema.Types.ObjectId, ref: "Kho", required: true },

    productDecription: { type: String },
    productReview: { type: String },
  },
  {
    timeStamps: true,
  }
);

productSchema.index({ name: 'text' });
productSchema.index({ p_id: 'text' });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
