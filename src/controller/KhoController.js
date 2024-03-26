const KhoService = require("../services/KhoService");

const createKho = async (req, res) => {
  try {
    const { khoID, name, uID } = req.body;

    if (!name || !uID || !khoID) {
      return res.status(200).json({
        status: "Error",
        message: "Inputs (khoID, name, uid) are required!",
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
        message: "KhoId (khoID) is required!",
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
        message: "KhoID (khoID) is required!",
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
        message: "KhoID (khoID) is required!",
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
