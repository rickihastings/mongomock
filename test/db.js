var Lab = require('lab'),
	mongomock = require('../index.js'),
	MongoClient = new mongomock.MongoClient();

var db = {},
	describe = Lab.experiment,
	it = Lab.test,
	expect = Lab.expect,
	before = Lab.before,
	after = Lab.after;

MongoClient.connect('', function(err, ldb) {
	db = ldb;
	db.collection('collection_one');
	db.collection('collection_two');
});

describe('Db', function() {
	it('collectionNames() should return all without a name parameter', function(done) {
		expect(db.collectionNames()).to.have.length(2);
		done();
	});

	it('collectionNames() should return one with a name parameter', function(done) {
		expect(db.collectionNames('collection_two')).to.have.length(1);
		done();
	});

	it('collections() should return the collections without a callback', function(done) {
		expect(db.collections()).to.have.length(2);
		done();
	});

	it('collections() should return the collections with a callback', function(done) {
		db.collections(function(err, collections) {
			expect(collections).to.have.length(2);
			done();
		});
	});

	it('collection() should create a collection without options', function(done) {
		db.collection('collection_three', function(err, collection) {
			expect(collection._name).to.equal('collection_three');
			done();
		});
	});

	it('collection() should return existing collection with callback', function(done) {
		db.collection('collection_two', function(err, collection) {
			expect(collection._name).to.equal('collection_two');
			done();
		});
	});

	it('collection() should return existing collection without callback', function(done) {
		expect(db.collection('collection_two')._name).to.equal('collection_two');
		done();
	});

	it('dropCollection() should drop collection without a callback', function(done) {
		db.dropCollection('collection_three');
		expect(db.collections()).to.have.length(2);
		done();
	});

	it('dropCollection() should drop collection with a callback', function(done) {
		db.collection('collection_three');
		db.dropCollection('collection_three', function(err, dropped) {
			expect(dropped).to.be.true;
			done();
		});
	});

	it('dropCollection() shouldn\'t drop an invalid collection', function(done) {
		db.dropCollection('collection_three');
		done();
	});
});