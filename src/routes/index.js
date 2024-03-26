const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const categoryRouter = require("./CategoryRouter");
const nguonNhapRouter = require("./NguonNhapRouter")
const khoRouter = require("./KhoRouter")

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/nguon-nhap", nguonNhapRouter);
  app.use("/api/kho", khoRouter);
};

module.exports = routes;
