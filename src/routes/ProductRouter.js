const express = require("express");
const router = express.Router();
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");
const productController = require('../controller/ProductController')

router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);
router.get("/getAll", authMiddleware, productController.getAllProduct);
router.get("/get/:id", authUserMiddleware, productController.getProduct);

module.exports = router;
