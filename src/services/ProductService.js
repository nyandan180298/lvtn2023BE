const Category = require("../model/CategoryModel");
const NguonNhap = require("../model/NguonNhapModel");
const Product = require("../model/ProductModel");
const Kho = require("../model/KhoModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { p_id, kho, category, nguon_nhap } = newProduct;
    //Create
    try {
      //Check Product
      const checkedProduct = await Product.findOne({
        p_id: p_id,
      });

      const checkedKho = await Kho.findById(kho);
      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      const checkedNguonnhap = await NguonNhap.findById(nguon_nhap);
      if (checkedNguonnhap === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
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
          error_code: 0,
          status: "OK",
          message: "Thành công",
          data: {
            data: createdProduct,
            kho: resKho,
            category: resCategory,
            nguon_nhap: checkedNguonnhap,
          },
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
      const checkedProduct = await Product.findById(id);

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm không tồn tại",
        });
      }

      //update category
      if (checkedProduct.category.toString() !== data.category) {
        const oldCt = await Category.findById(checkedProduct.category);
        const newCt = await Category.findById(data.category);

        oldCt.products.pop(checkedProduct);
        await Category.findByIdAndUpdate(checkedProduct.category, {
          products: oldCt.products,
        });

        newCt.products.push(checkedProduct);
        await Category.findByIdAndUpdate(data.category, {
          products: newCt.products,
        });
      }

      const res = await Product.findByIdAndUpdate(id, data);

      resolve({
        error_code: 0,
        status: "OK",
        message: "Thành công",
        data: res,
      });
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
      const checkedProduct = await Product.findById(id);

      if (checkedProduct === null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm không tồn tại",
        });
      }

      await Product.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit = 8, page = 0, sort = "asc", filter, khoid) => {
  return new Promise(async (resolve, reject) => {
    //get all products
    try {
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
          p_id: sort,
        });

      const totalProduct = await Product.find({ kho: khoid }).countDocuments();

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
      const checkedProduct = await Product.findById(id);

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
  deleteProduct,
  getAllProduct,
  getProduct,
};
