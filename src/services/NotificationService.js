const Notification = require("../model/NotificationModel");

const getAllNotification = (
  limit = 12,
  page = 0,
  sort = "desc",
  filter,
  khoid
) => {
  return new Promise(async (resolve, reject) => {
    //get all notifications
    try {
      const query = { kho: khoid };

      if (filter) {
        query.is_read = filter;
      }

      const allNotification = await Notification.find(query)
        .limit(limit)
        .skip(page * limit)
        .sort({
          sent_on: sort,
        });

      const totalNotification = await Notification.find(query).countDocuments();

      if (!allNotification[0]) {
        resolve({
          message: "Không có sản phẩm trong Kho",
          error_code: 400,
        });
      }

      resolve({
        message: "Thành công",
        error_code: 0,
        data: {
          data: allNotification,
          total: totalNotification,
          page: Number(page) + 1,
          totalPage: Math.ceil(totalNotification / limit),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUnreadNotification = (khoid) => {
  return new Promise(async (resolve, reject) => {
    //get all notifications
    try {
      const query = { kho: khoid, is_read: false };

      const totalNotification = await Notification.find(query).countDocuments();

      if (totalNotification === 0) {
        resolve({
          message: "Không có thông báo trong Kho",
          error_code: 400,
        });
      }

      resolve({
        message: "Thành công",
        error_code: 0,
        data: {
          total: totalNotification,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const readNotification = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Notification
      const checkedNotification = await Notification.findById(id);

      if (checkedNotification === null) {
        resolve({
          error_code: 400,
          status: "Error!",
          message: "Thông báo không tồn tại",
        });
      }
      const res = await Notification.findByIdAndUpdate(id, { is_read: true });

      resolve({
        error_code: 0,
        status: "OK",
        message: "Thành công",
        data: { notification: res },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const readAllNotification = (khoid) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check Notification
      const query = { kho: khoid, is_read: false };

      const unreadNotis = await Notification.find(query);

      unreadNotis.map(async (noti) => {
        await Notification.findByIdAndUpdate(noti, { is_read: true });
      });

      resolve({
        error_code: 0,
        status: "OK",
        message: "Thành công",
        data: "No Data",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllNotification,
  readNotification,
  readAllNotification,
  getUnreadNotification,
};
