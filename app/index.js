const express = require('express');
const db = require('./models/sequelize');

const app = express();

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  console.log('mysql database connected');
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});