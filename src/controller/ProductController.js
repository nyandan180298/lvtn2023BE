const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { pID, name, quantity, price, ngayNhap, hanSD, kho, category, nguonNhap } = req.body;

    if (!pID || !name || !quantity || !price || !ngayNhap || !hanSD || !kho || !category || !nguonNhap) {
      return res.status(200).json({
        status: "Error",
        message: "Tất cả input đều cần thiết!",
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
    const { limit, page, sort } = req.query;
    const { filter, khoid } = req.body;
    const pageVar = page ? page - 1 : 0;

    if (!khoid) {
      return res.status(400).json({
        status: "Error",
        message: "Phải kèm id của kho",
      });
    }

    const result = await ProductService.getAllProduct(
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
