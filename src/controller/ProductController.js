const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      p_id,
      name,
      quantity,
      price,
      ngay_nhap,
      han_sd,
      kho,
      category,
      nguon_nhap,
    } = req.body;

    if (
      !p_id ||
      !name ||
      !quantity ||
      !price ||
      !ngay_nhap ||
      !han_sd ||
      !kho ||
      !category ||
      !nguon_nhap
    ) {
      return res.status(200).json({
        status: "Error",
        message:
          "Tất cả input p_id, name, quantity, price, ngay_nhap, han_sd, kho, category, nguon_nhap đều cần thiết!",
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

    const result = await ProductService.updateProduct(pid, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.id;

    if (!pid) {
      return res.status(400).json({
        status: "Error",
        message: "p_id is required!",
      });
    }

    const result = await ProductService.deleteProduct(pid);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, search, filter } = req.query;
    const { khoid } = req.body;
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
      search,
      khoid
    );
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllCustomerProduct = async (req, res) => {
  try {
    const { kid } = req.params.id;
    const { limit, page, sort, search, filter } = req.query;
    const { khoid } = req.body;
    const pageVar = page ? page - 1 : 0;

    if (!khoid) {
      return res.status(400).json({
        status: "Error",
        message: "Phải kèm id của kho",
      });
    }

    const result = await ProductService.getAllCustomerProduct(
      limit,
      pageVar,
      sort,
      filter,
      search,
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
    const pid = req.params.id;

    if (!pid) {
      return res.status(200).json({
        status: "Error",
        message: "pid is required!",
      });
    }

    const result = await ProductService.getProduct(pid);
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
  deleteProduct,
  getAllProduct,
  getAllCustomerProduct,
  getProduct,
};
