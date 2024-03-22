const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const categoryRouter = require("./CategoryRouter");

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
};

module.exports = routes;
