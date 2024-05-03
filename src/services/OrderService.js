const Category = require("../model/CategoryModel");
const Kho = require("../model/KhoModel");
const { Order } = require("../model/OrderModel");
const Customer = require("../model/CustomerModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { id, address, status, kho, customer, detail, total } = newOrder;
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

      const checkedCustomer = await Customer.findOne({
        phone_num: customer_phone_num,
      });
      if (checkedCustomer === null) {
        const createdCustomer = await Customer.create({
          name: customer,
          phone_num: customer_phone_num,
          kho: kho,
        });
        checkedKho.customers.push(createdCustomer);
      } else {
        
      }

      const createdOrder = await Order.create(newOrder);

      //Them Order vao Kho
      checkedKho.orders.push(createdOrder);
      const resKho = await Kho.findByIdAndUpdate(kho, {
        orders: checkedKho.orders,
      });

      //Them Order vao category
      checkedCategory.orders.push(createdOrder);

      const resCategory = await Category.findByIdAndUpdate(category, {
        orders: checkedCategory.orders,
      });

      if (createdOrder) {
        resolve({
          error_code: 0,
          status: "OK",
          message: "Thành công",
          data: {
            data: createdOrder,
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

      //update category
      if (checkedOrder.category.toString() !== data.category) {
        const oldCt = await Category.findById(checkedOrder.category);
        const newCt = await Category.findById(data.category);

        oldCt.orders.pop(checkedOrder);
        await Category.findByIdAndUpdate(checkedOrder.category, {
          orders: oldCt.orders,
        });

        newCt.orders.push(checkedOrder);
        await Category.findByIdAndUpdate(data.category, {
          orders: newCt.orders,
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

const getAllOrder = (limit = 8, page = 0, sort = "asc", filter, khoid) => {
  return new Promise(async (resolve, reject) => {
    //get all orders
    try {
      //FILTER
      if (filter) {
        const filterOrder = await Order.find({ category: filter })
          .limit(limit)
          .skip(page * limit);
        const totalFilter = await Order.find({
          category: filter,
        }).countDocuments();

        resolve({
          message: "Thành công",
          error_code: 0,
          data: {
            data: filterOrder,
            total: totalFilter,
            page: Number(page) + 1,
            totalPage: Math.ceil(totalFilter / limit),
          },
        });
      }

      const allOrder = await Order.find({ kho: khoid })
        .limit(limit)
        .skip(page * limit)
        .sort({
          p_id: sort,
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
      const checkedOrder = await Order.findOne({ p_id: id });

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
};
