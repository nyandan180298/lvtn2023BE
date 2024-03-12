const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { cID, username, email, password, phoneNo, firstName, lastName } =
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
          message: "username or email already taken",
        });
      }

      const createdUser = await User.create({
        cID,
        username,
        email,
        password: hash,
        phoneNo,
        firstName,
        lastName,
      });
      if (createdUser) {
        resolve({ status: "OK", message: "success", data: createdUser });
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
          message: "User does not exist",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkedUser.password
      );
      if (!comparePassword) {
        resolve({
          status: "Ok",
          message: "Password is incorrect!",
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
          message: "success",
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
