const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { pID, name, quantity, price, ngayNhap, hanSD } = req.body;

    if (!pID || !name || !quantity || !price || !ngayNhap || !hanSD) {
      return res.status(200).json({
        status: "Error",
        message: "Inputs are required!",
      });
    }

    const result = await ProductService.createProduct(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "Error",
        message: "ProductID (pID) is required!",
      });
    }

    const result = await ProductService.updateProduct(productId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProductNN = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "Error",
        message: "ProductID (pID) is required!",
      });
    }

    const result = await ProductService.updateProductNN(productId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "Error",
        message: "ProductID (pID) is required!",
      });
    }

    const result = await ProductService.deleteProduct(productId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const {limit , page, sort} = req.query
    const {filter} = req.body
    const result = await ProductService.getAllProduct(limit , page, sort, filter);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "Error",
        message: "ProductID (pID) is required!",
      });
    }

    const result = await ProductService.getProduct(productId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  updateProductNN,
  deleteProduct,
  getAllProduct,
  getProduct,
};
