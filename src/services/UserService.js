const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { uID, username, email, password, phoneNo, firstName, lastName } =
      newUser;
    //Password BCRYPT
    const hash = bcrypt.hashSync(password, 10);
    //Create
    try {
      //Check User
      const checkedUser =
        (await User.findOne({
          username: username,
        })) ||
        (await User.findOne({
          email: email,
        }));

      if (checkedUser !== null) {
        resolve({
          status: "Error!",
          message: "Username hoặc email đã tồn tại",
        });
      }

      const createdUser = await User.create({
        uID,
        username,
        email,
        password: hash,
        phoneNo,
        firstName,
        lastName,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Thành công",
          data: createdUser,
          error_code: 0,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = userLogin;
    //Login
    try {
      //Check User
      const checkedUser = await User.findOne({
        username: username,
      });
      if (checkedUser === null) {
        resolve({
          status: "Ok",
          error_code: 400,
          message: "User không tồn tại",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkedUser.password
      );
      if (!comparePassword) {
        resolve({
          status: "Ok",
          error_code: 400,
          message: "Sai mật khẩu!",
        });
      }

      const accessToken = await generateAccessToken({
        id: checkedUser.id,
        isAdmin: checkedUser.isAdmin,
      });

      const refreshToken = await generateRefreshToken({
        id: checkedUser.id,
        isAdmin: checkedUser.isAdmin,
      });

      if (checkedUser) {
        resolve({
          status: "OK",
          error_code: 0,
          message: "Thành công",
          data: {
            token: { access_token: accessToken, refresh_token: refreshToken },
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    //Update
    try {
      //Check User
      const checkedUser = await User.findOne({ uID: id });

      if (checkedUser === null) {
        resolve({
          status: "Error!",
          message: "User không tồn tại",
        });
      }

      const updatedUser = await User.findOneAndUpdate({ uID: id }, data);

      if (updatedUser) {
        resolve({
          status: "OK",
          message: "Thành công",
          error_code: 0,
          data: updatedUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      //Check User
      const checkedUser = await User.findOne({ uID: id });

      if (checkedUser === null) {
        resolve({
          status: "Error!",
          message: "User không tồn tại",
        });
      }

      await User.findOneAndDelete({ uID: id }, { new: true });

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    //get all users
    try {
      const allUser = await User.find();

      resolve({
        status: "OK",
        message: "Thành công",
        error_code: 0,
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check User
      const checkedUser = await User.findOne({ uID: id });

      if (checkedUser === null) {
        resolve({
          status: "Error!",
          message: "User không tồn tại",
        });
      }

      resolve({
        status: "OK",
        message: "Thành công",
        error_code: 0,
        data: checkedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getMe = (id) => {
  return new Promise(async (resolve, reject) => {
    //Get
    try {
      //Check User
      const checkedUser = await User.findById(id);

      if (checkedUser === null) {
        resolve({
          status: "Error!",
          message: "User không tồn tại",
        });
      }

      resolve({
        status: "OK",
        error_code: 0,
        message: "Thành công",
        data: checkedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  getMe,
};
