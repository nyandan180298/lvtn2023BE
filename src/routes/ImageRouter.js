const express = require("express");
const router = express.Router();
const imageController = require("../controller/ImageController");
const multer = require("multer");

const upload = multer({
  dest: "../images/",
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.post("/upload", upload.single("file"), imageController.uploadImage);
router.delete("/delete/:filepath", imageController.deleteImage);
router.use("/use",express.static("../images"));

module.exports = router;
