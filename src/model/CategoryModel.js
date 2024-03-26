const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
  numberProduct: { type: Number, require: true },
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
