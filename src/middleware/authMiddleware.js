const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({
      message: "Missing Token",
      status: "ERROR",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "Authentication failed",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (payload.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Authentication failed",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({
      message: "Missing Token",
      status: "ERROR",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.params.id;

  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN,
    function (err, user) {
      if (err) {
        return res.status(404).json({
          message: "Authentication failed",
          status: "ERROR",
        });
      }
      const { payload } = user;
      if (payload?.isAdmin || payload?.id === userId) {
        req.user = payload
        next();
      } else {
        return res.status(404).json({
          message: "Authentication failed",
          status: "ERROR",
        });
      }
    }
  );
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};
