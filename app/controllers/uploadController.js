const path = require('path');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/gif': 'gif',
};

const uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }
  console.log(req.files);
  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  const image = req.files.image;
  const mimetype = MIME_TYPE_MAP[image.mimetype];
  if (!mimetype) {
    console.log('Image NOT uploaded')
    return res
    .status(404)
    .json({ message: 'Incorrect file extension please use png, jpeg or gif' });
  }
  console.log(`File size: ${image.size/1000}kB`)
  const uploadPath = path.join(__dirname, '..', '/images', image.name);
  console.log(uploadPath);
  image.mv(uploadPath, (err) => {
    console.log('image was uploaded')
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
};

module.exports = { uploadFile };
