const express = require('express');
const userRoutes = require('./routes/userRoutes');
const db = require('./models/sequelize');
require('dotenv').config();

const app = express();

// Enable json parsing
app.use(express.json());

app.use('/', userRoutes);

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Server is running of port ' + PORT));
});
