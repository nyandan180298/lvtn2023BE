const ImageService = require("../services/ImageService");

const uploadImage = async (req, res) => {
  try {
    const image = {
      filename: req.file.originalname,
      filepath: req.file.path,
      contentType: req.file.mimetype,
    };

    if (!image) {
      return res.status(200).json({
        status: "Error",
        message: "image is required!",
      });
    }
    const result = await ImageService.uploadImage(image);
    res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const filepath = req.params.filepath;
    const localFilePath = "..\\images\\" + filepath;
    const result = await ImageService.deleteImage(localFilePath);

    res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
