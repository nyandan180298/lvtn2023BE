const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const customerController = require('../controller/CustomerController')

router.post("/create/", customerController.createCustomer);
router.post("/update/:id/", customerController.updateCustomer);
router.delete("/delete/:id", authMiddleware, customerController.deleteCustomer);
router.post("/getAll", customerController.getAllCustomer);
router.get("/get/:id", customerController.getCustomer);

module.exports = router;
