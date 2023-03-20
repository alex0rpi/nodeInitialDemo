const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
let dbConnection;

// One function to initially connect to the database
exports.connectMongoDB = async (cb) => {
  try {
    const client = await MongoClient.connect(`${url}/dice_players`,{ useUnifiedTopology: true });
    dbConnection = client.db(); // .db() method return to us an interface to interact with the db.
    return cb();
  } catch (error) {
    console.log('error', error);
    return cb(error);
  }
};

// Retrieve the db connection ONCE we're done connecting to it. This will allow us to CRUD on it.
exports.getDb = () => dbConnection; //this function just returns the dbConnection variable
