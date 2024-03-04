const mongoose = require("mongoose");
const warehouseSchema = new mongoose.Schema(
  {
    wID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    mID: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);
const Warehouse = mongoose.model("Warehouse", warehouseSchema);
module.exports = Warehouse;
