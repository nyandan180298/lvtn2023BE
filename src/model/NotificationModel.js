const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    // 0: chua doc, 1: da doc
    is_read: { type: Boolean, required: true, default: 0 },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    kho: { type: mongoose.Schema.Types.ObjectId, ref: "Kho", required: true },
    sent_on: { type: Date, default: Date.now },
  },
  {
    timeStamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
