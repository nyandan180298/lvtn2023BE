const Image = require("../model/imageModel");
const fs = require("fs");

const uploadImage = (data) => {
  return new Promise(async (resolve, reject) => {
    //Upload
    try {
      const image = new Image(data);

      const saveImage = await image.save();

      if (saveImage) {
        resolve({
          error_code: 0,
          status: "OK",
          message: "Thành công",
          data: saveImage,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const deleteImage = (filepath) => {
  return new Promise(async (resolve, reject) => {
    //Delete
    try {
      await Image.findOneAndDelete({ filepath: filepath });
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        resolve({
          error_code: 0,
          status: "OK",
          message: `Image đã xóa thành công.`,
        });
      } else {
        resolve({
          error_code: 404,
          status: "OK",
          message: `Không tìm thấy image để xóa.`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  uploadImage,
  deleteImage,
};
