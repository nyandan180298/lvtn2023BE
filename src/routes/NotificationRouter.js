const express = require("express");
const router = express.Router();
const notificationController = require("../controller/NotificationController");

router.post("/getAll", notificationController.getAllNotification);
router.post("/getUnread", notificationController.getUnreadNotification);
router.post("/read/:id/", notificationController.readNotification);
router.post("/readAll/", notificationController.readAllNotification);

module.exports = router;
