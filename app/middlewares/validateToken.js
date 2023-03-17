const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    /*Authorization: 'Bearer TOKEN' so, the token is part of the
     authorization string that comes with the header.*/
    if (!token) {
      throw new Error('Authentication failed!');
    }
    //Verify that the existing token is valid.
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    /*Once validated, we add data to the request before let it continue.*/
    // req.userData = { userId: decodedToken.userId };
    next(); // allow the request to continue its journey.
  } catch (err) {
    return res.status(403).json({ message: 'Authentication failed due to invalid or non existing token!' });
  }
  next();
};
