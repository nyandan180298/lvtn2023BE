const Customer = require("../model/CustomerModel");
const Kho = require("../model/KhoModel");

const createCustomer = (newCustomer) => {
  return new Promise(async (resolve, reject) => {
    const { phone_num, kho } = newCustomer;
    //Create
    try {
      //Check Customer
      const checkedCustomer = await Customer.findOne({
        phone_num: phone_num,
      });

      const checkedKho = await Kho.findById(kho);
      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      if (checkedCustomer !== null) {
        resolve({
          status: "Error!",
          message: "Khách hàng đã tồn tại",
        });
      }

      const createdCustomer = await Customer.create(newCustomer);

      //Them Customer vao Kho
      checkedKho.customers.push(createdCustomer);

      await Kho.findByIdAndUpdate(kho, { customers: checkedKho.customers });

      if (createdCustomer) {
        resolve({
          error_code: 0,
          status: "OK",
          message: "Thành công",
          data: {
            data: createdCustomer,
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateCustomer = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Customer
      const checkedCustomer = await Customer.findById(id);

      if (checkedCustomer === null) {
        resolve({
          status: "Error!",
          message: "Khách hàng không tồn tại",
        });
      }

      const res = await Customer.findByIdAndUpdate(id, data);

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

const deleteCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check Customer
      const checkedCustomer = await Customer.findById(id);

      if (checkedCustomer === null) {
        resolve({
          status: "Error!",
          message: "Sản phẩm không tồn tại",
        });
      }

      await Customer.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCustomer = (limit = 8, page = 0, sort = "asc", search, khoid) => {
  return new Promise(async (resolve, reject) => {
    //get all customers
    try {
      const query = { kho: khoid };

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { phone_num: { $regex: search, $options: "i" } },
        ];
      }

      const allCustomer = await Customer.find(query)
        .limit(limit)
        .skip(page * limit)
        .sort({
          vip: "desc", total: "desc", name: sort
        });

      const totalCustomer = await Customer.find({
        kho: khoid,
      }).countDocuments();

      if (!allCustomer[0]) {
        resolve({
          message: "Chi nhánh chưa có khách hàng",
          error_code: 400,
        });
      }

      resolve({
        message: "Thành công",
        error_code: 0,
        data: {
          data: allCustomer,
          total: totalCustomer,
          page: Number(page) + 1,
          totalPage: Math.ceil(totalCustomer / limit),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check Customer
      const checkedCustomer = await Customer.findById(id);

      if (checkedCustomer === null) {
        resolve({
          status: "Error!",
          message: "Khách hàng không tồn tại",
        });
      }

      resolve({
        status: "OK",
        error_code: 0,
        message: "Thành công",
        data: checkedCustomer,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomer,
};
