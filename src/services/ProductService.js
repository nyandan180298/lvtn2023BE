const Product = require("../model/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { pID } = newProduct;
    //Create
    try {
      //Check Product
      const checkedProduct =
        (await Product.findOne({
          pID: pID,
        }))

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

      const updatedProduct = await Product.findOneAndUpdate({ pID: id }, data);

      if (updatedProduct) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: updatedProduct,
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
      const checkedProduct = await Product.findOne({ cID: id });

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Product doesn't exist",
        });
      }

      await Product.findOneAndDelete({ cID: id }, { new: true });

      resolve({
        status: "OK",
        message: "Deleted product successfully",
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
        message: "Success",
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
      const checkedProduct = await Product.findOne({ cID: id });

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Product doesn't exist",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
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
