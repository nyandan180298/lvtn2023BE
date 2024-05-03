const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      address,
      status,
      kho,
      customer, // ten customer
      customer_phone_num, // sdt customer
      detail,
      total,
    } = req.body;

    if (
      !address||
      !status||
      !kho||
      !customer||
      !customer_phone_num||
      !detail||
      !total
    ) {
      return res.status(200).json({
        status: "Error",
        message:
          "Tất cả input address, status, kho, customer, detail, total",
      });
    }

    const result = await OrderService.createOrder(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const pid = req.params.id;
    const data = req.body;

    const { category } = req.body;

    if (!pid) {
      return res.status(400).json({
        status: "Error",
        message: "id is required!",
      });
    }

    if (!category) {
      return res.status(400).json({
        status: "Error",
        message: "category is required!",
      });
    }

    const result = await OrderService.updateOrder(pid, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const pid = req.params.id;

    if (!pid) {
      return res.status(400).json({
        status: "Error",
        message: "p_id is required!",
      });
    }

    const result = await OrderService.deleteOrder(pid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const { limit, page, sort } = req.query;
    const { filter, khoid } = req.body;
    const pageVar = page ? page - 1 : 0;

    if (!khoid) {
      return res.status(400).json({
        status: "Error",
        message: "Phải kèm id của kho",
      });
    }

    const result = await OrderService.getAllOrder(
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

const getOrder = async (req, res) => {
  try {
    const pid = req.params.id;

    if (!pid) {
      return res.status(200).json({
        status: "Error",
        message: "pid is required!",
      });
    }

    const result = await OrderService.getOrder(pid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
};
