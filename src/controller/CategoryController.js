const CategoryService = require("../services/CategoryService");

const createCategory = async (req, res) => {
  try {
    const { categoryID, name } = req.body;

    if (!name || !categoryID) {
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
    const categoryId = req.params.id;
    const data = req.body;
    if (!categoryId) {
      return res.status(200).json({
        status: "Error",
        message: "CategoryID (categoryID) is required!",
      });
    }

    const result = await CategoryService.updateCategory(categoryId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(200).json({
        status: "Error",
        message: "CategoryID (categoryID) is required!",
      });
    }

    const result = await CategoryService.deleteCategory(categoryId);
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
