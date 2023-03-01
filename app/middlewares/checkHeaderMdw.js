const checkHeader = (req, res, next) => {
  if (!req.headers['username'] || !req.headers['password']) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  next()
};

module.exports = checkHeader;
