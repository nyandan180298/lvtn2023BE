const Kho = require("../model/KhoModel");
const { Order } = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const Customer = require("../model/CustomerModel");
const CustomerService = require("./CustomerService");

const updateVIP = (total) => {
  if (total < 500000) return 0;
  else if (total < 2000000) return 1;
  else if (total < 5000000) return 2;
  else if (total < 10000000) return 3;
  else return 4;
};

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { id, address, kho, customer, customer_phone_num, detail } = newOrder;
    //Create
    try {
      //Check Order
      const checkedOrder = await Order.findById(id);
      if (checkedOrder !== null) {
        resolve({
          status: "Error!",
          message: "Đơn hàng đã tồn tại",
        });
      }

      const checkedKho = await Kho.findById(kho);
      if (checkedKho === null) {
        resolve({
          status: "Error!",
          message: "Kho không tồn tại",
        });
      }

      //Xu ly Product cua Order
      let total = 0;
      await Promise.all(
        detail.map(async (value) => {
          const x = await Product.findById(value.product);
          await Product.findByIdAndUpdate(value.product, {
            quantity: x.quantity - value.quantity,
          });
          total = total + value.quantity * x.price;
        })
      );

      // Them Order vao Customer
      const checkedCustomer = await Customer.findOne({
        phone_num: customer_phone_num,
      });

      if (checkedCustomer === null) {
        const newCustomer = {
          name: customer,
          phone_num: customer_phone_num,
          kho: kho,
        };
        await CustomerService.createCustomer(newCustomer);
      }

      const secondCheckedCustomer = await Customer.findOne({
        phone_num: customer_phone_num,
      });

      const createdOrder = await Order.create({
        address,
        kho,
        detail,
        customer: secondCheckedCustomer,
        total,
      });

      secondCheckedCustomer.orders_history.push(createdOrder._id);
      await Customer.findOneAndUpdate(
        { phone_num: customer_phone_num },
        { orders_history: secondCheckedCustomer.orders_history }
      );

      //Them Order vao Kho
      checkedKho.orders.push(createdOrder);
      await Kho.findByIdAndUpdate(kho, {
        orders: checkedKho.orders,
      });

      if (createdOrder) {
        resolve({
          error_code: 0,
          status: "OK",
          message: "Thành công",
          data: {
            data: createdOrder,
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Order
      const checkedOrder = await Order.findById(id);

      if (checkedOrder === null) {
        resolve({
          status: "Error!",
          message: "Đơn hàng không tồn tại",
        });
      }

      const res = await Order.findByIdAndUpdate(id, data);

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

const completeOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Order
      const checkedOrder = await Order.findById(id);

      const { total, phone_num } = data;

      if (checkedOrder === null) {
        resolve({
          error_code: 400,
          status: "Error!",
          message: "Đơn hàng không tồn tại",
        });
      }

      const checkedCustomer = await Customer.findOne({ phone_num: phone_num });

      if (checkedCustomer === null) {
        resolve({
          error_code: 400,
          status: "Error!",
          message: "Khách hàng không tồn tại",
        });
      }
      const newTotal = checkedCustomer.total + total;
      const newVIP = updateVIP(newTotal);

      const cRes = await Customer.findOneAndUpdate(
        { phone_num: phone_num },
        { total: newTotal, vip: newVIP }
      );

      const res = await Order.findByIdAndUpdate(id, { status: 2 });

      resolve({
        error_code: 0,
        status: "OK",
        message: "Thành công",
        data: { order: res, customer: cRes },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Order
      const { detail } = data;

      const checkedOrder = await Order.findById(id);

      if (checkedOrder === null) {
        resolve({
          error_code: 400,
          status: "Error!",
          message: "Đơn hàng không tồn tại",
        });
      }

      // Xu ly product khi cancel Order
      await Promise.all(
        detail.map(async (value) => {
          const x = await Product.findById(value.product);
          await Product.findByIdAndUpdate(value.product, {
            quantity: x.quantity + value.quantity,
          });
        })
      );

      const res = await Order.findByIdAndUpdate(id, { status: 0 });

      resolve({
        error_code: 0,
        status: "OK",
        message: "Thành công",
        data: { order: res },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check Order
      const checkedOrder = await Order.findById(id);

      if (checkedOrder === null) {
        resolve({
          status: "Error!",
          message: "Đơn hàng không tồn tại",
        });
      }

      await Order.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = (limit = 5, page = 0, sort = "asc", filter, khoid) => {
  return new Promise(async (resolve, reject) => {
    //get all orders
    try {
      const allOrder = await Order.find({ kho: khoid })
        .limit(limit)
        .skip(page * limit)
        .sort({
          created_on: sort,
        });

      const totalOrder = await Order.find({ kho: khoid }).countDocuments();

      if (!allOrder[0]) {
        resolve({
          message: "Không có sản phẩm trong Kho",
          error_code: 400,
        });
      }

      resolve({
        message: "Thành công",
        error_code: 0,
        data: {
          data: allOrder,
          total: totalOrder,
          page: Number(page) + 1,
          totalPage: Math.ceil(totalOrder / limit),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check Order
      const checkedOrder = await Order.findById(id);

      if (checkedOrder === null) {
        resolve({
          status: "Error!",
          message: "Đơn hàng không tồn tại",
        });
      }

      resolve({
        status: "OK",
        error_code: 0,
        message: "Thành công",
        data: checkedOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  completeOrder,
  cancelOrder,
};
