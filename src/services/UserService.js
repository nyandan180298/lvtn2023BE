const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const {
      cID,
      username,
      email,
      password,
      phoneNo,
      firstName,
      lastName,
    } = newUser;
    //Check User
    const checkedUser =
      (await User.findOne({
        username: username,
      })) ||
      (await User.findOne({
        email: email,
      }));
      
    if (checkedUser !== null) {
      resolve({ status: "Error!", message: "username or email already taken" });
    }
    //Password BCRYPT
    const hash = bcrypt.hashSync(password, 10);

    //Create
    try {
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

module.exports = {
  createUser,
};
