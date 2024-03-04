const mongoose = require("mongoose");
const managerSchema = new mongoose.Schema(
  {
    mID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);
const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;