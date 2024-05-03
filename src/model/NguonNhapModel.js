const mongoose = require("mongoose");
const nguonNhapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_num: { type: String, required: true, unique: true },
  kho: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Kho" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
const NguonNhap = mongoose.model("NguonNhap", nguonNhapSchema);
module.exports = NguonNhap;
