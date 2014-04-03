var _ = require('lodash'),
	MongoClient = require(__dirname + '/lib/mongo_client').MongoClient;

exports.MongoClient = MongoClient;

/*new MongoClient().connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	if (err) {
		throw err;
	}

	var newCol = db.collection('new');

	console.log(DataStore);
});*/