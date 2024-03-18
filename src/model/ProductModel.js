const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    pID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    nguonNhap: { type: mongoose.Schema.Types.ObjectId, ref: "NguonNhap", require: true },
    ngayNhap: { type: Date, required: true },
    hanSD: { type: Date, require: true },
    image: { type: Buffer, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true },

    productDecription: { type: String },
    productReview: { type: String },
  },
  {
    timeStamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
