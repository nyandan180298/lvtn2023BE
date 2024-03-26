const Kho = require("../model/KhoModel");
const User = require("../model/UserModel");

const createKho = (newKho) => {
  return new Promise(async (resolve, reject) => {
    const { khoID, name, uID } = newKho;
    //Create
    try {
      //Check Kho
      const checkedKho = await Kho.findOne({
        khoID: khoID,
      });

      if (checkedKho !== null) {
        resolve({
          status: "Error!",
          message: "Kho đã tồn tại",
        });
      }

      const manager = await User.findOne({ uID: uID });

      const createdKho = await Kho.create({ khoID, name, user: manager });

      if (createdKho) {
        resolve({
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
      const checkedKho = await Kho.findOne({ khoID: id });

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
        });
      }

      if (data.products) {
        checkedKho.products.push(data.products);
        const updatedKho = await Kho.findOneAndUpdate(
          { khoID: id },
          { products: checkedKho.products }
        );
        resolve({
          status: "OK",
          message: "Thành công",
          data: updatedKho,
        });
      } else {
        const updatedKho = await Kho.findOneAndUpdate({ khoID: id }, data);

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
      const checkedKho = await Kho.findOne({ khoID: id });

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      await Kho.findOneAndDelete({ khoID: id }, { new: true });

      resolve({
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
      const checkedKho = await Kho.findOne({ khoID: id });

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      resolve({
        status: "OK",
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
