const mongoose = require("mongoose");
const khoSchema = new mongoose.Schema({
  kho_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  nguon_nhaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "NguonNhap" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Kho = mongoose.model("Kho", khoSchema);
module.exports = Kho;
