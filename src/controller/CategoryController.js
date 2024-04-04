const CategoryService = require("../services/CategoryService");

const createCategory = async (req, res) => {
  try {
    const { category_id, name } = req.body;

    if (!name || !category_id) {
      return res.status(200).json({
        status: "Error",
        message: "Inputs are required!",
      });
    }

    const result = await CategoryService.createCategory(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const data = req.body;
    if (!category_id) {
      return res.status(200).json({
        status: "Error",
        message: "category_id is required!",
      });
    }

    const result = await CategoryService.updateCategory(category_id, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.id;

    if (!category_id) {
      return res.status(200).json({
        status: "Error",
        message: "category_id is required!",
      });
    }

    const result = await CategoryService.deleteCategory(category_id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const result = await CategoryService.getAllCategory();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(200).json({
        status: "Error",
        message: "Id is required!",
      });
    }

    const result = await CategoryService.getCategory(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
};
