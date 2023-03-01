const multer = require('multer');
const path = require('path');

const MIME_TYPE_MAP = { 'image/png': 'png', 'image/jpeg': 'jpeg', 'image/gif': 'gif' };

//file upload middleware.
/* Multer provides an object containing pre-configured middlewares.*/
const multerFileUpload = multer({
  limit: 1000000, // 1MB max size
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../images'));
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype]; // extract the file extension
      cb(null, Date.now() + '-' + file.originalname + '.' + ext);
    },
  }),
  // check that the file multer receives is valid.
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    /*!! converts "undefined" to false, and "defined", to true*/
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
});

module.exports = { multerFileUpload };
