const UserService = require("../services/UserService");
const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const createUser = async (req, res) => {
  try {
    const {
      cID,
      username,
      email,
      password,
      confirmPassword,
      phoneNo,
      firstName,
      lastName,
    } = req.body;
    const validEmail = reg.test(email);

    if (
      !cID ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNo ||
      !firstName ||
      !lastName
    ) {
      return res.status(200).json({
        status: "Error",
        message: "All inputs are required!",
      });
    } else if (!validEmail) {
      return res.status(200).json({
        status: "Error",
        message: "Email must be valid",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "Error",
        message: "Password must match eachother",
      });
    }
    const result = await UserService.createUser(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(200).json({
        status: "Error",
        message: "All inputs are required!",
      });
    } 
    const result = await UserService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
