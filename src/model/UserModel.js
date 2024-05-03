const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    is_admin: { type: Boolean, default: false, required: true },
    image: {
      data: Buffer,
      contentType: String,
    },

    kho: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kho" }],
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
  },
  {
    timeStamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
