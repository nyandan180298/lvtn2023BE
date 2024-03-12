const jwt = require("jsonwebtoken");

const generateAccessToken = async (payload) => {
  const access_token = jwt.sign({ payload }, "access_token", {
    expiresIn: "24h",
  });

  return access_token;
};

const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ payload }, "refresh_token", {
    expiresIn: "365d",
  });

  return refresh_token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
