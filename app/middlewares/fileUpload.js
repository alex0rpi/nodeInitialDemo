import multer from 'multer';

const MIME_TYPE_MAP = {
  //possible kind of files we might deal with.
  //multer has a property, mimetype, which can look like the following:
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

//file upload middleware.
/*Specifically it is an object that contains multiple middleware.*/
const fileUpload = multer({
  limit: 2000000, // 2MB
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      //request object, the file extracted and the call back to execute when it is done.
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, new Date().toLocaleDateString() + '.' + ext);
    },
  }),
  //   Validate file to upload
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    /*!! converts "undefined" to false, and "defined", to true*/
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
});

export default fileUpload;
