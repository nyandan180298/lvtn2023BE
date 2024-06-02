const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  contentType: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
