const addCacheConctrol = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
};

module.exports = addCacheConctrol;
