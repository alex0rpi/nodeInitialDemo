const jwt = require('jsonwebtoken');
require('dotenv').config(); // only needed to require it here

const validateUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    /*Authorization: 'Bearer TOKEN' so, the token is part of the
     authorization string that comes with the header.*/
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // console.log('decoded token:', decodedToken);
    if (!decodedToken) {
      return res.status(403).json({ message: 'Authentication failed due to invalid or non existing token!' });
    }
    next(); // allow the request to continue its journey.
  } catch (err) {
    console.log('error:', err);
    return res.status(403).json({ message: 'Authentication failed due to invalid or non existing token!' });
  }
};

module.exports = { validateUser };
