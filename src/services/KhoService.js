const Kho = require("../model/KhoModel");
const User = require("../model/UserModel");
const Product = require("../model/ProductModel");

const createKho = (newKho) => {
  return new Promise(async (resolve, reject) => {
    const { kho_id, name, uid } = newKho;
    //Create
    try {
      //Check Kho
      const checkedKho = await Kho.findOne({
        kho_id: kho_id,
      });

      if (checkedKho !== null) {
        resolve({
          status: "Error!",
          message: "Kho đã tồn tại",
        });
      }

      const manager = await User.findById(uid);

      const createdKho = await Kho.create({ kho_id, name, user: manager });

      manager.kho.push(createdKho);

      const resManager = await User.findByIdAndUpdate(uid, {
        kho: manager.kho,
      });

      if (createdKho) {
        resolve({
          error_code: 0,
          status: "OK",
          message: "Thành công",
          data: createdKho,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateKho = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Kho
      const checkedKho = await Kho.findById(id);

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      if (data.products) {
        checkedKho.products.push(data.products);
        const updatedKho = await Kho.findByIdAndUpdate(id, {
          products: checkedKho.products,
        });
        resolve({
          status: "OK",
          message: "Thành công",
          data: updatedKho,
        });
      } else {
        const updatedKho = await Kho.findByIdAndUpdate(id, data);

        if (updatedKho) {
          resolve({
            status: "OK",
            message: "Thành công",
            data: updatedKho,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteKho = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check Kho
      const checkedKho = await Kho.findById(id);

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      checkedKho.products.forEach(async (value) => {
        await Product.findByIdAndDelete(value);
      });

      const manager = await User.findById(checkedKho.user);

      manager.kho.pop(checkedKho);

      await User.findByIdAndUpdate(checkedKho.user, { kho: manager.kho });

      await Kho.findByIdAndDelete(id, { new: true });

      resolve({
        error_code: 0,
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllKho = () => {
  return new Promise(async (resolve, reject) => {
    //get all categories
    try {
      const allKho = await Kho.find();

      resolve({
        status: "OK",
        message: "Thành công",
        data: allKho,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getKho = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check Kho
      const checkedKho = await Kho.findById(id);

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      resolve({
        status: "OK",
        error_code: 0,
        message: "Thành công",
        data: checkedKho,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createKho,
  updateKho,
  deleteKho,
  getAllKho,
  getKho,
};
