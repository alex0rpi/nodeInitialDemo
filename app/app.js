const express = require('express');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const notFoundController = require('./controllers/sequelize/notFoundController');
// mysql imports_______________________________________________________________
const db = require('./models/sequelize');
// MongoDB imports_____________________________________________________________
const { connectMongoDB } = require('./helpers/mongodb/createMongoDB');
require('dotenv').config(); // only needed to require it here

const app = express();

// Enable json parsing
app.use(express.json());

app.use('/players', userRoutes);
app.use('/games', gameRoutes);
app.use('/ranking', rankingRoutes);

app.use(notFoundController);

// Strategy is to 1ST connect to ANY database and THEN start LISTENING.

// Connect to mysql database if chosen
if (process.env.DB === 'mysql') {
  console.log(process.env.DB);
  const PORT = process.env.PORT || 5000;
  db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Server is running of port ' + PORT));
  });
}
// Connect to mongoDB database if chosen
if (process.env.DB === 'mongodb') {
  console.log('#### '+process.env.DB+' ####');
  const cbFunction = (error) => {
    if (!error) {
      const PORT = 3000;
      app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
      console.log('Connected to the database');
    }
    console.log(`Error connecting to the database: ${error}`)
  };
  connectMongoDB(cbFunction);
}
