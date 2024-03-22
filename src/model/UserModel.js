const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    uID: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true},
    phoneNo: { type: String, required: true },
    address: { type: String, required: false },
    idNumber: { type: Number, required: false,  },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },

  },
  {
    timeStamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
