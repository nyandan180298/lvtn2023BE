const mongoose = require("mongoose");
const khoSchema = new mongoose.Schema({
  khoID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});
const Kho = mongoose.model("Kho", khoSchema);
module.exports = Kho;
