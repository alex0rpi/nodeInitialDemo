const { multerFileUpload } = require('../middlewares/multerFileUpload');

const uploadFile = (req, res) => {
  multerFileUpload.single('image');
  res.status(200).json({ message: 'File was successfully uploaded.' });
};

module.exports = { uploadFile };
