const Kho = require("../model/KhoModel");
const NguonNhap = require("../model/NguonNhapModel");

const createNguonNhap = (newNguonNhap) => {
  return new Promise(async (resolve, reject) => {
    const { phone_num, kho_id, name } = newNguonNhap;
    //Create
    try {
      //Check NguonNhap
      const checkedNguonNhap = await NguonNhap.findOne({
        phone_num: phone_num,
      });

      if (checkedNguonNhap !== null) {
        resolve({
          status: "Error!",
          message: "SĐT Nguồn nhập đã tồn tại",
        });
      }

      const checkedKho = await Kho.findById(kho_id);

      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
          error_code: 404,
        });
      }

      const createdNguonNhap = await NguonNhap.create({
        phone_num,
        kho: kho_id,
        name,
      });

      checkedKho.nguon_nhaps.push(createdNguonNhap);

      await Kho.findByIdAndUpdate(kho_id, {
        nguon_nhaps: checkedKho.nguon_nhaps,
      });

      if (createdNguonNhap) {
        resolve({
          status: "OK",
          message: "Thành công",
          error_code: 0,
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
      const checkedNguonNhap = await NguonNhap.findById(id);

      if (checkedNguonNhap === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
        });
      }

      const updatedNguonNhap = await NguonNhap.findByIdAndUpdate(id, data);

      if (updatedNguonNhap) {
        resolve({
          error_code: 0,
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

      const checkedKho = await Kho.findById(checkedNguonNhap.kho);
      checkedKho.nguon_nhaps.pop(checkedNguonNhap);

      await Kho.findByIdAndUpdate(checkedNguonNhap.kho, {
        nguon_nhaps: checkedKho.nguon_nhaps,
      });

      await NguonNhap.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        error_code: 0,
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllNguonNhap = (limit = 8, page = 0, khoid) => {
  return new Promise(async (resolve, reject) => {
    //get all categories
    try {
      const allNguonNhap = await NguonNhap.find({ kho: khoid })
        .limit(limit)
        .skip(page * limit)
        .sort({
          name: "asc",
        });

      const totalNguonNhap = await NguonNhap.find({
        kho: khoid,
      }).countDocuments();

      resolve({
        status: "OK",
        error_code: 0,
        message: "Thành công",
        data: {
          data: allNguonNhap,
          total: totalNguonNhap,
          page: Number(page) + 1,
          totalPage: Math.ceil(totalNguonNhap/ limit),
        },
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
      const checkedNguonNhap = await NguonNhap.findById(id);

      if (checkedNguonNhap === null) {
        resolve({
          status: "Error!",
          message: "Nguồn nhập không tồn tại",
        });
      }

      resolve({
        status: "OK",
        error_code: 0,
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
