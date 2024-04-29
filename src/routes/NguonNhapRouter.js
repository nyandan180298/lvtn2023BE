const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const nguonNhapController = require('../controller/NguonNhapController')

router.post("/create", nguonNhapController.createNguonNhap);
router.post("/update/:id", nguonNhapController.updateNguonNhap);
router.delete("/delete/:id", authMiddleware, nguonNhapController.deleteNguonNhap);
router.post("/getAll", nguonNhapController.getAllNguonNhap);
router.get("/get/:id", nguonNhapController.getNguonNhap);

module.exports = router;
