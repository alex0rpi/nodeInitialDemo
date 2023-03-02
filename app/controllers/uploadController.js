const path = require('path');

const uploadFile = (req, res) => {
  let image;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log(req.files);
  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  image = req.files.image;
  uploadPath = path.join(__dirname, '..','/images',image.name)

  console.log(uploadPath)

  // Use the mv() method to place the file somewhere on your server
  image.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
  });
};

module.exports = { uploadFile };
