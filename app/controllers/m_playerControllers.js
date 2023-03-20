const { getDb } = require('../helpers/mongodb/createMongoDB');

let db = getDb();

const m_createPlayer = async (req, res) => {
  const { username, password } = req.body;
  let db = getDb();
  try {
    
    const result = await db.collection('players').insertOne({ username, password: hashedPwd });
  } catch (error) {
    res.status(500).json({ msg: 'Could not post new user.' });
  }
};

module.exports = {
  m_createPlayer,
};
