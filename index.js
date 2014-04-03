var _ = require('lodash'),
	mongo = require('mongodb'),
	MongoClient = require('./lib/mongo_client').MongoClient;

ObjectID = mongo.ObjectID;
DataStore = {};
// globally define a db object which will house the data

exports.MongoClient = new MongoClient();

exports.MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	if (err) {
		throw err;
	}

	var newCol = db.collection('new');

	console.log(DataStore);
});