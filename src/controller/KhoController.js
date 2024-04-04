const KhoService = require("../services/KhoService");

const createKho = async (req, res) => {
  try {
    const { kho_id, name, uid } = req.body;

    if (!name || !uid || !kho_id) {
      return res.status(200).json({
        status: "Error",
        message: "Inputs (kho_id, name, uid) are required!",
      });
    }

    const result = await KhoService.createKho(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateKho = async (req, res) => {
  try {
    const khoId = req.params.id;
    const data = req.body;
    if (!khoId) {
      return res.status(200).json({
        status: "Error",
        message: "KhoId is required!",
      });
    }

    const result = await KhoService.updateKho(khoId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteKho = async (req, res) => {
  try {
    const khoId = req.params.id;

    if (!khoId) {
      return res.status(200).json({
        status: "Error",
        message: "Id is required!",
      });
    }

    const result = await KhoService.deleteKho(khoId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllKho = async (req, res) => {
  try {
    const result = await KhoService.getAllKho();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getKho = async (req, res) => {
  try {
    const khoId = req.params.id;

    if (!khoId) {
      return res.status(200).json({
        status: "Error",
        message: "Id is required!",
      });
    }

    const result = await KhoService.getKho(khoId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createKho,
  updateKho,
  deleteKho,
  getAllKho,
  getKho,
};
