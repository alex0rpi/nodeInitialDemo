const addCacheConctrol = (req, res, next) => {
  req.setHeader('Cache-Control', 'no-cache');
  next();
};

module.exports = addCacheConctrol;
