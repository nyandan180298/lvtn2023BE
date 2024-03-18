const mongoose = require("mongoose");
const nguonNhapSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
  }
);
const NguonNhap = mongoose.model("NguonNhap", nguonNhapSchema);
module.exports = NguonNhap;
