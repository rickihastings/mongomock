var Lab = require('lab'),
	mongomock = require('..'),
	MongoClient = new mongomock.MongoClient();

var describe = Lab.experiment,
	it = Lab.test,
	expect = Lab.expect,
	before = Lab.before,
	after = Lab.after;

describe('MongoClient', function() {
	it('connect() should work without options', function(done) {
		MongoClient.connect('', function(err, db) {
			if (!err) {
				done();
			}
		});
	});

	it('connect() should work with options', function(done) {
		MongoClient.connect('', {}, function(err, db) {
			if (!err) {
				done();
			}
		});
	});

	it('connect() should fail without a callback', function(done) {
		try {
			MongoClient.connect('');
		} catch (e) {
			done();
		}
	});
});