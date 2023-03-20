const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

exports.connectMongoDB = async () => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/dice_players')

  } catch (error) {}
};
