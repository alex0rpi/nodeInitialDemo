const express = require('express');
const checkHeader = require('../middlewares/checkHeaderMdw');
const fileUpload = require('../middlewares/fileUpload');
const addCacheConctrol = require('../middlewares/cacheControlMdw');
const { userController, timeController } = require('../controllers/userController');

const router = express.Router();

router.get('/user', userController);

router.post('/upload', fileUpload.single('image'));

router.post('/time', [addCacheConctrol, checkHeader], timeController);

module.exports = router;
