const express = require('express');
const checkHeader = require('../middlewares/checkHeaderMdw');
const addCacheConctrol = require('../middlewares/cacheControlMdw');
const { userController, timeController } = require('../controllers/userController');
const { upload } = require('../controllers/uploadController');

const router = express.Router();

router.get('/user', userController);

router.post('/upload', upload);

router.post('/time', addCacheConctrol, checkHeader, timeController);

module.exports = router;
