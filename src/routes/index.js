const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const categoryRouter = require("./CategoryRouter");
const nguonNhapRouter = require("./NguonNhapRouter")
const khoRouter = require("./KhoRouter")
const customerRouter = require("./CustomerRouter")

const routes = (app) => {
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/nguon-nhap", nguonNhapRouter);
  app.use("/kho", khoRouter);
  app.use("/customer", customerRouter);
};

module.exports = routes;
