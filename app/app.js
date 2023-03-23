const express = require('express');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const notFoundController = require('./controllers/notFoundController');
// mysql imports_______________________________________________________________
const db = require('./models');
// MongoDB imports_____________________________________________________________
const { connectMongoDB } = require('./db/createMongoDB');
require('dotenv').config(); // only needed to require it here

const app = express();

// Enable json parsing
app.use(express.json());

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/ranking', rankingRoutes);

app.use(notFoundController);

// Strategy is to 1ST connect to ANY database and THEN start LISTENING.

// Connect to mysql database if chosen
if (process.env.DB === 'mysql') {
  console.log('#################');
  console.log('#     ' + process.env.DB + '     #');
  console.log('#################');
  const PORT = process.env.PORT || 5000;
  db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Server is running of port ' + PORT));
  });
}
// Connect to mongoDB database if chosen
if (process.env.DB === 'mongodb') {
  console.log('#################');
  console.log('#    ' + process.env.DB + '    #');
  console.log('#################');
  connectMongoDB((error) => {
    if (!error) {
      const PORT = 5000;
      app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
      console.log('Connected to the database');
    }
  });
}
