const Category = require("../model/CategoryModel");
const Product = require("../model/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { pID } = newProduct;
    //Create
    try {
      //Check Product
      const checkedProduct = await Product.findOne({
        pID: pID,
      });

      if (checkedProduct !== null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm đã tồn tại",
        });
      }

      const createdProduct = await Product.create(newProduct);
      if (createdProduct) {
        resolve({ status: "OK", message: "Thành công", data: createdProduct });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Product
      const checkedProduct = await Product.findOne({ pID: id });

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm không tồn tại",
        });
      }

      //update category
      if (data.categoryID) {
        const checkCategory = await Category.findOne({
          categoryID: data.categoryID,
        });

        //kiem tra category
        for (let arr of checkCategory.products) {
          if (arr.toString() == checkedProduct._id.toString()) {
            return resolve({
              status: "Error!",
              message: "Sản phẩm đã tồn tại trong loại (category)",
            });
          }
        }
        arr = checkCategory.products.concat(checkedProduct);
        if (!arr) {
          arr = [checkedProduct];
        }

        await Category.findOneAndUpdate(
          { categoryID: data.categoryID },
          { products: arr }
        );

        //Update category khong update data khac 
        const res = await Product.findOneAndUpdate(
          { pID: id },
          { category: checkCategory }
        );
        resolve({
          status: "OK",
          message: "Thành công",
          data: res,
        });
      } else {
        const res = await Product.findOneAndUpdate({ pID: id }, data);
        resolve({
          status: "OK",
          message: "Thành công",
          data: res,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check Product
      const checkedProduct = await Product.findOne({ pID: id });

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm không tồn tại",
        });
      }

      await Product.findOneAndDelete({ cID: id }, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    //get all products
    try {
      const allProduct = await Product.find();

      resolve({
        status: "OK",
        message: "Thành công",
        data: allProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check Product
      const checkedProduct = await Product.findOne({ pID: id });

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm không tồn tại",
        });
      }

      resolve({
        status: "OK",
        message: "Thành công",
        data: checkedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
};
