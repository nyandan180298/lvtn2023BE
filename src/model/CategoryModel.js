const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    numberProduct: { type: Number, require: true },
  },
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
