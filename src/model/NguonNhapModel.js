const mongoose = require("mongoose");
const nguonNhapSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone_num: { type: String, required: true, unique: true },
  }
);
const NguonNhap = mongoose.model("NguonNhap", nguonNhapSchema);
module.exports = NguonNhap;
