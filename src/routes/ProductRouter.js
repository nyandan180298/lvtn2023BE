const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const productController = require('../controller/ProductController')

router.post("/create/", productController.createProduct);
router.put("/update/:id/", productController.updateProduct);
router.put("/updateNN/:id/", productController.updateProductNN);
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);
router.post("/getAll", productController.getAllProduct);
router.get("/get/:id", productController.getProduct);

module.exports = router;
