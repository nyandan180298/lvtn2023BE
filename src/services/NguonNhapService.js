const NguonNhap = require("../model/NguonNhapModel");

const createNguonNhap = (newNguonNhap) => {
  return new Promise(async (resolve, reject) => {
    const { phoneNo } = newNguonNhap;
    //Create
    try {
      //Check NguonNhap
      const checkedNguonNhap = await NguonNhap.findOne({
        phoneNo: phoneNo,
      });

      if (checkedNguonNhap !== null) {
        resolve({
          status: "Error!",
          message: "SĐT Nguồn nhập đã tồn tại",
        });
      }

      const createdNguonNhap = await NguonNhap.create(newNguonNhap);
      if (createdNguonNhap) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: createdNguonNhap,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateNguonNhap = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check NguonNhap
      const checkedNguonNhap = await NguonNhap.findById({ _id: id });

      if (checkedNguonNhap === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
        });
      }

      const updatedNguonNhap = await NguonNhap.findByIdAndUpdate(
        { _id: id },
        data
      );

      if (updatedNguonNhap) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: updatedNguonNhap,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteNguonNhap = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check NguonNhap
      const checkedNguonNhap = await NguonNhap.findById(id);

      if (checkedNguonNhap === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
        });
      }

      await NguonNhap.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllNguonNhap = () => {
  return new Promise(async (resolve, reject) => {
    //get all categories
    try {
      const allNguonNhap = await NguonNhap.find();

      resolve({
        status: "OK",
        message: "Thành công",
        data: allNguonNhap,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getNguonNhap = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check NguonNhap
      const checkedNguonNhap = await NguonNhap.findOne({ pID: id });

      if (checkedNguonNhap === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
        });
      }

      resolve({
        status: "OK",
        message: "Thành công",
        data: checkedNguonNhap,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNguonNhap,
  updateNguonNhap,
  deleteNguonNhap,
  getAllNguonNhap,
  getNguonNhap,
};
