const cron = require("node-cron");
const Product = require("../model/ProductModel");
const Notification = require("../model/NotificationModel");
const Kho = require("../model/KhoModel");

cron.schedule("0 0 * * *", async () => {
  // runs daily at midnight
  const khoIds = await Kho.find().distinct("_id");

  khoIds.forEach(async (khoId) => {
    const expirationDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    //14 days
    const expiringProducts = await Product.find({
      han_sd: { $lte: expirationDate },
      kho: khoId,
    });

    expiringProducts.forEach(async (product) => {
      const expireDate = Math.ceil(
        (product.han_sd - new Date(Date.now())) / (1000 * 60 * 60 * 24)
      );

      if (expireDate < 0) {
        const notification = await Notification.create({
          message: `Sản phẩm "${product.name}" đã hết hạn`,
          is_read: 0,
          product: product._id,
          kho: khoId,
        });
      } else {
        const notification = await Notification.create({
          message: `Sản phẩm "${product.name}" sẽ hết hạn trong ${expireDate} ngày`,
          is_read: 0,
          product: product._id,
          kho: khoId,
        });
      }
    });

    const emptyProducts = await Product.find({
      quantity: { $lte: 20 },
      kho: khoId,
    });
    emptyProducts.forEach(async (product) => {
      if (product.quantity === 0) {
        const notification = await Notification.create({
          message: `Sản phẩm "${product.name}" đã hết hàng. Hãy chú ý cập nhật số lượng sản phẩm`,
          is_read: 0,
          product: product._id,
          kho: khoId,
        });
      } else {
        const notification = await Notification.create({
          message: `Sản phẩm "${product.name}" chỉ còn ${product.quantity} số lượng trong kho. Hãy chú ý cập nhật số lượng sản phẩm.`,
          is_read: 0,
          product: product._id,
          kho: khoId,
        });
      }
    });
  });
});
