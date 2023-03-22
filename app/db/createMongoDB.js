const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
let dbConnection;

// One function to initially connect to the database
const connectMongoDB = async (cb) => {
  try {
    const client = await MongoClient.connect(`${url}/DICE_GAME`);
    dbConnection = client.db(); // .db() method return to us an interface to interact with the db.
    return cb();
  } catch (error) {
    console.log('error', error);
    return cb(error);
  }
};

// Retrieve the db connection ONCE we're done connecting to it. This will allow us to CRUD on it.
const getDb = () => dbConnection; //this function just returns the dbConnection variable

module.exports = { connectMongoDB, getDb };
