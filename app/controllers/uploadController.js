const { multerFileUpload } = require('../middlewares/multerFileUpload');

const uploadFile = (req, res) => {
  console.log(req.files);
  // if (!req.files) res.status(404).json({ message: 'File not detected on request.' });
  multerFileUpload.single('image');
  res.status(200).json({ message: 'File was successfully uploaded.' });
};

module.exports = { uploadFile };
