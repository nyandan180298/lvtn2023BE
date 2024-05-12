const { refreshTokenJwtService } = require("../services/JwtService");
const UserService = require("../services/UserService");
const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const {
      uid,
      username,
      email,
      password,
      confirm_password,
      first_name,
      last_name,
    } = req.body;
    const validEmail = reg.test(email);

    if (
      !uid ||
      !username ||
      !email ||
      !password ||
      !confirm_password ||
      !first_name ||
      !last_name
    ) {
      return res.status(400).json({
        status: "Error",
        message: "All inputs are required!",
      });
    } else if (!validEmail) {
      return res.status(400).json({
        status: "Error",
        message: "Email must be valid",
      });
    } else if (password !== confirm_password) {
      return res.status(400).json({
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "UserID (uID) is required!",
      });
    }
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    const result = await UserService.updateUser(userId, data);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "UserID (uID) is required!",
      });
    }

    const result = await UserService.deleteUser(userId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "UserID (uID) is required!",
      });
    }

    const result = await UserService.getUser(userId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const result = await UserService.getMe(req.user.id);

    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    if (!req.headers) {
      return res.status(404).json({
        status: "Error",
        message: "Headers is required!",
      });
    }

    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        status: "Error",
        message: "Token is required!",
      });
    }

    const result = await refreshTokenJwtService(token);
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
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  getMe,
  refreshToken,
};
