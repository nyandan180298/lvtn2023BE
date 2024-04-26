const NguonNhapService = require("../services/NguonNhapService");

const createNguonNhap = async (req, res) => {
  try {
    const { name, phone_num, khoid } = req.body;

    if (!khoid)
      return res.status(200).json({
        status: "Error",
        message: "Thiếu id của kho!",
      });

    if (!name || !phone_num) {
      return res.status(200).json({
        status: "Error",
        message: "Inputs are required!",
      });
    }

    const result = await NguonNhapService.createNguonNhap(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateNguonNhap = async (req, res) => {
  try {
    const nguonNhapId = req.params.id;
    const data = req.body;
    if (!nguonNhapId) {
      return res.status(200).json({
        status: "Error",
        message: "NguonNhapID (nguonNhapID) is required!",
      });
    }

    const result = await NguonNhapService.updateNguonNhap(nguonNhapId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteNguonNhap = async (req, res) => {
  try {
    const nguonNhapId = req.params.id;

    if (!nguonNhapId) {
      return res.status(200).json({
        status: "Error",
        message: "NguonNhapID (nguonNhapID) is required!",
      });
    }

    const result = await NguonNhapService.deleteNguonNhap(nguonNhapId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllNguonNhap = async (req, res) => {
  try {
    const result = await NguonNhapService.getAllNguonNhap();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getNguonNhap = async (req, res) => {
  try {
    const nguonNhapId = req.params.id;

    if (!nguonNhapId) {
      return res.status(200).json({
        status: "Error",
        message: "NguonNhapID (nguonNhapID) is required!",
      });
    }

    const result = await NguonNhapService.getNguonNhap(nguonNhapId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createNguonNhap,
  updateNguonNhap,
  deleteNguonNhap,
  getAllNguonNhap,
  getNguonNhap,
};
