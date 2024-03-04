const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    pID: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    quantity: { type: Number, required: true},
    price: { type: Number, required: true},
    productDecription: { type: String, required: false },
    productReview: { type: String, required: false },
    category: { type: String, required: true },
    CID: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
