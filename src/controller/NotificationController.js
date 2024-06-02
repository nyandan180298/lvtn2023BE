const NotificationService = require("../services/NotificationService");

const getAllNotification = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const { khoid } = req.body;
    const pageVar = page ? page - 1 : 0;

    if (!khoid) {
      return res.status(400).json({
        status: "Error",
        message: "Phải kèm id của kho",
      });
    }

    const result = await NotificationService.getAllNotification(
      limit,
      pageVar,
      sort,
      filter,
      khoid
    );
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUnreadNotification = async (req, res) => {
  try {
    const { khoid } = req.body;

    if (!khoid) {
      return res.status(400).json({
        status: "Error",
        message: "Phải kèm id của kho",
      });
    }

    const result = await NotificationService.getUnreadNotification(khoid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const readNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        status: "Error",
        message: "Thiếu id Thông báo!",
      });
    }

    const result = await NotificationService.readNotification(id, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const readAllNotification = async (req, res) => {
  try {
    const { khoid } = req.body;

    if (!khoid) {
      return res.status(400).json({
        status: "Error",
        message: "Thiếu id kho!",
      });
    }

    const result = await NotificationService.readAllNotification(khoid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  getAllNotification,
  readNotification,
  readAllNotification,
  getUnreadNotification,
};
