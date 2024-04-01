const Category = require("../model/CategoryModel");
const NguonNhap = require("../model/NguonNhapModel");
const Product = require("../model/ProductModel");
const Kho = require("../model/KhoModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { pID, kho, category } = newProduct;
    //Create
    try {
      //Check Product
      const checkedProduct = await Product.findOne({
        pID: pID,
      });

      const checkedKho = await Kho.findById(kho);
      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      const checkedCategory = await Category.findById(category);
      if (checkedCategory === null) {
        resolve({
          status: "Error!",
          message: "Danh mục không tồn tại",
        });
      }

      if (checkedProduct !== null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm đã tồn tại",
        });
      }

      const createdProduct = await Product.create(newProduct);

      //Them Product vao Kho
      checkedKho.products.push(createdProduct);
      const resKho = await Kho.findByIdAndUpdate(kho, {
        products: checkedKho.products,
      });

      //Them Product vao category
      checkedCategory.products.push(createdProduct);

      const resCategory = await Category.findByIdAndUpdate(category, {
        products: checkedCategory.products,
      });

      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: { data: createdProduct, kho: resKho, category: resCategory },
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

        if (checkedProduct.category) {
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
                  numberProduct: oldCt.numberProduct - 1,
                });

                //Them product o category moi
                const newCt = await Category.findById(newId);
                newCt.products.push(arr);
                await Category.findByIdAndUpdate(newId, {
                  products: newCt.products,
                  numberProduct: newCt.numberProduct + 1,
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
        checkCategory.products.push(checkedProduct);

        //Update Products trong Category
        await Category.findOneAndUpdate(
          { categoryID: data.categoryID },
          {
            products: checkCategory.products,
            numberProduct: checkCategory.numberProduct + 1,
          }
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

const getAllProduct = (limit = 5, page = 0, sort = "asc", filter, khoid) => {
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
          message: "Thành công",
          error_code: 0,
          data: {
            data: filterProduct,
            total: totalFilter,
            page: Number(page) + 1,
            totalPage: Math.ceil(totalFilter / limit),
          },
        });
      }

      const allProduct = await Product.find({ kho: khoid })
        .limit(limit)
        .skip(page * limit)
        .sort({
          pID: sort,
        });

      if (!allProduct[0]) {
        resolve({
          message: "Không có sản phẩm trong Kho",
          error_code: 400,
        });
      }

      resolve({
        message: "Thành công",
        error_code: 0,
        data: {
          data: allProduct,
          total: totalProduct,
          page: Number(page) + 1,
          totalPage: Math.ceil(totalProduct / limit),
        },
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
        error_code: 0,
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
