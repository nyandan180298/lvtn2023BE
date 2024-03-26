const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const khoController = require("../controller/KhoController");

router.post("/create", khoController.createKho);
router.put("/update/:id", khoController.updateKho);
router.delete("/delete/:id", authMiddleware, khoController.deleteKho);
router.get("/getAll", khoController.getAllKho);
router.get("/get/:id", khoController.getKho);

module.exports = router;
