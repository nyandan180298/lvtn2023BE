const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", authMiddleware, userController.deleteUser);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.get("/get/:id", authUserMiddleware, userController.getUser);
router.get("/get_me", authUserMiddleware, userController.getMe);
router.post("/refresh_token", userController.refreshToken);

module.exports = router;
