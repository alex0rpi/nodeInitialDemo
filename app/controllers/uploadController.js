const fileUpload = require('../middlewares/fileUpload');

const upload = (req, res) => {
  // Execute the single middleware. Expect a file with the name "image"
  console.log(req.files); 
  console.log(req.body); 
  fileUpload.single('image');
  res.status(200).json({ message: 'File was successfully uploaded.' });
};

module.exports = { upload };
