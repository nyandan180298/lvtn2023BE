const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
