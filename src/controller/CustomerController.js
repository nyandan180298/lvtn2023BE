const CustomerService = require("../services/CustomerService");

const createCustomer = async (req, res) => {
  try {
    const { name, phone_num, kho } = req.body;

    if (!phone_num || !name || !kho) {
      return res.status(200).json({
        status: "Error",
        message:
          "Tất cả input name, phone_num, kho, đều cần thiết!",
      });
    }

    const result = await CustomerService.createCustomer(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        status: "Error",
        message: "id is required!",
      });
    }

    const result = await CustomerService.updateCustomer(id, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const pid = req.params.id;

    if (!pid) {
      return res.status(400).json({
        status: "Error",
        message: "p_id is required!",
      });
    }

    const result = await CustomerService.deleteCustomer(pid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllCustomer = async (req, res) => {
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

    const result = await CustomerService.getAllCustomer(
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

const getCustomer = async (req, res) => {
  try {
    const pid = req.params.id;

    if (!pid) {
      return res.status(200).json({
        status: "Error",
        message: "pid is required!",
      });
    }

    const result = await CustomerService.getCustomer(pid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomer,
};
