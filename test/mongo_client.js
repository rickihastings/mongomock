var Lab = require('lab'),
	MongoClient = require('../lib/mongo_client').MongoClient;

var mongoClient = new MongoClient(),
	describe = Lab.experiment,
	it = Lab.test,
	expect = Lab.expect,
	before = Lab.before,
	after = Lab.after;

describe('MongoClient', function() {
	it('connect should work without options', function(done) {
		mongoClient.connect('', function(err, db) {
			if (!err) {
				done();
			}
		});
	});

	it('connect should work with options', function(done) {
		mongoClient.connect('', {}, function(err, db) {
			if (!err) {
				done();
			}
		});
	});

	it('connect should fail without a callback', function(done) {
		try {
			mongoClient.connect('');
		} catch (e) {
			done();
		}
	});
});