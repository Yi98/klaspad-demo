const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'klaspaddevdb';

let _db;

// Reusable database connection
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      _db = client.db(dbName);
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  }
};