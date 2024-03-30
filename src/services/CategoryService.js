const Category = require("../model/CategoryModel");

const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    const { categoryID, name } = newCategory;
    //Create
    try {
      //Check Category
      const checkedCategory =
        (await Category.findOne({
          categoryID: categoryID,
        })) ||
        (await Category.findOne({
          name: name,
        }));

      if (checkedCategory !== null) {
        resolve({
          status: "Error!",
          message: "Danh mục đã tồn tại",
        });
      }

      const createdCategory = await Category.create(newCategory);
      if (createdCategory) {
        resolve({ status: "OK", message: "Thành công", data: createdCategory });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateCategory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Category
      const checkedCategory = await Category.findOne({ categoryID: id });

      if (checkedCategory === null) {
        resolve({
          status: "Error!",
          message: "Danh mục không tồn tại",
        });
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { categoryID: id },
        data
      );

      if (updatedCategory) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: updatedCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check Category
      const checkedCategory = await Category.findOne({ categoryID: id });

      if (checkedCategory === null) {
        resolve({
          status: "Error!",
          message: "Danh mục không tồn tại",
        });
      }

      await Category.findOneAndDelete({ cID: id }, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    //get all categories
    try {
      const allCategory = await Category.find();

      resolve({
        status: "OK",
        message: "Thành công",
        data: allCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check Category
      const checkedCategory = await Category.findOne({ categoryID: id });

      if (checkedCategory === null) {
        resolve({
          status: "Error!",
          message: "Danh mục không tồn tại",
        });
      }

      resolve({
        status: "OK",
        message: "Thành công",
        data: checkedCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
};
