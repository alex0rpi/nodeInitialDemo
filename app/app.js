const express = require('express');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const notFoundController = require('./controllers/notFoundController');
const db = require('./models');
require('dotenv').config(); // only needed to require it here

const app = express();

// Enable json parsing
app.use(express.json());

app.use('/players', userRoutes);
app.use('/games', gameRoutes);
app.use('/ranking', rankingRoutes);

app.use(notFoundController)

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Server is running of port ' + PORT));
});
