const Category = require("../model/CategoryModel");
const NguonNhap = require("../model/NguonNhapModel");
const Product = require("../model/ProductModel");
const Kho = require("../model/KhoModel");

const createProduct = (newProduct, khoId) => {
  return new Promise(async (resolve, reject) => {
    const { pID } = newProduct;
    const id = khoId;
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

      //Them Product vao Kho
      const checkedKho = await Kho.findOne({ khoID: id });
      checkedKho.products.push(createdProduct);

      const resKho = await Kho.findOneAndUpdate(
        { khoID: id },
        { products: checkedKho.products }
      );

      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: createdProduct,
          kho: resKho,
        });
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

        //Neu CategoryId moi khac CategoryId Cu
        if (
          checkCategory._id.toString() !==
          checkedProduct.category._id.toString()
        ) {
          const oldId = checkedProduct.category._id;
          const oldCt = await Category.findById(oldId);
          const newId = checkCategory._id;

          for (let arr of oldCt.products) {
            if (arr.toString() == checkedProduct._id.toString()) {
              oldCt.products.pop(arr);

              //Xoa product o category cu~
              await Category.findByIdAndUpdate(oldId, {
                products: oldCt.products,
              });

              //Them product o category moi
              const newCt = await Category.findById(newId);
              newCt.products.push(arr);
              await Category.findByIdAndUpdate(newId, {
                products: newCt.products,
              });

              //Cap nhat category o Product
              const res = await Product.findOneAndUpdate(
                { pID: id },
                { category: checkCategory }
              );
              resolve({
                status: "OK",
                message: "Cập nhật Danh mục mới thành công",
                data: res,
              });
            }
          }
        }

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

        //Update Products trong Category
        await Category.findOneAndUpdate(
          { categoryID: data.categoryID },
          { products: arr }
        );

        // Update category o Product
        const res = await Product.findOneAndUpdate(
          { pID: id },
          { category: checkCategory }
        );
        resolve({
          status: "OK",
          message: "Cập nhật Danh mục thành công",
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

const updateProductNN = (id, data) => {
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
      //update nguonNhap
      if (data.phoneNo) {
        const checknNhap = await NguonNhap.findOne({
          phoneNo: data.phoneNo,
        });
        if (!checknNhap) {
          resolve({
            status: "Error",
            message: "SĐT Nguồn nhập không tồn tại",
          });
        }

        // Update NguonNhap o Product
        const res = await Product.findOneAndUpdate(
          { pID: id },
          { nguonNhap: checknNhap }
        );

        resolve({
          status: "OK",
          message: "Cập nhật Nguồn nhập thành công",
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

const getAllProduct = (limit = 8, page = 0, sort = "asc", filter) => {
  return new Promise(async (resolve, reject) => {
    //get all products
    try {
      const totalProduct = await Product.countDocuments();
      //FILTER
      if (filter) {
        const filterProduct = await Product.find({ category: filter })
          .limit(limit)
          .skip(page * limit);
        const totalFilter = await Product.find({
          category: filter,
        }).countDocuments();

        resolve({
          status: "OK",
          message: "Thành công",
          data: filterProduct,
          total: totalFilter,
          page: Number(page) + 1,
          totalPage: Math.ceil(totalFilter / limit),
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .sort({
          pID: sort,
        });

      resolve({
        status: "OK",
        message: "Thành công",
        data: allProduct,
        total: totalProduct,
        page: Number(page) + 1,
        totalPage: Math.ceil(totalProduct / limit),
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
  updateProductNN,
  deleteProduct,
  getAllProduct,
  getProduct,
};
