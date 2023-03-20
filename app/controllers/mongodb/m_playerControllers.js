const { getDb } = require('../../helpers/mongodb/createMongoDB');

let db = getDb();

const m_createPlayer = async (req, res) => {
  const { username, password } = req.body;
  let db = getDb();
};

module.exports = {
    m_createPlayer
}
