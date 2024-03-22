const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const categoryController = require('../controller/CategoryController')

router.post("/create", categoryController.createCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", authMiddleware, categoryController.deleteCategory);
router.get("/getAll", categoryController.getAllCategory);
router.get("/get/:id", categoryController.getCategory);

module.exports = router;
