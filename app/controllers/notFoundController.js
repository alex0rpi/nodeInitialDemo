module.exports = (req, res) => {
  res.status(404).json({ error:404, message: 'Nothing found here (•_•)' });
};
