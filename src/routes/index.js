const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const categoryRouter = require("./CategoryRouter");
const nguonNhapRouter = require("./NguonNhapRouter")

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/nguon-nhap", nguonNhapRouter);
};

module.exports = routes;
