const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const orderController = require('../controller/OrderController')

router.post("/create/", orderController.createOrder);
router.post("/update/:id/", orderController.updateOrder);
router.delete("/delete/:id", authMiddleware, orderController.deleteOrder);
router.post("/getAll", orderController.getAllOrder);
router.get("/get/:id", orderController.getOrder);

module.exports = router;
