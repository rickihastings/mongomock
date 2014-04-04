var Lab = require('lab'),
	mongomock = require('..'),
	MongoClient = new mongomock.MongoClient();

var db = {},
	collection = {},
	describe = Lab.experiment,
	it = Lab.test,
	expect = Lab.expect,
	before = Lab.before,
	after = Lab.after;

MongoClient.connect('', function(err, ldb) {
	db = ldb;
	collection = db.collection('collection');
});

describe('Collection', function() {
	it('insert() should insert a single document with options', function(done) {
		collection.insert({prop: 1, more: 2}, {}, function(err, docs) {
			expect(docs).to.have.length(1);
			done();
		});
	});

	it('insert() should insert a single document without options', function(done) {
		collection.insert({prop: 1, more: 4}, function(err, docs) {
			expect(docs).to.have.length(1);
			done();
		});
	});

	it('insert() should insert a multiple documents', function(done) {
		collection.insert([{prop: 1, more: 2}, {prop: 3}], function(err, docs) {
			expect(docs).to.have.length(2);
			done();
		});
	});

	it('find() should find documents with no options', function(done) {
		collection.find({}, function(err, cursor) {
			expect(cursor).to.be.an('object');
			done();
		});
	});

	it('find() should find documents with no query and options', function(done) {
		collection.find({}, {}, function(err, cursor) {
			expect(cursor).to.be.an('object');
			done();
		});
	});

	it('find() should find documents with no query and options', function(done) {
		collection.find({prop: 1}, {}, function(err, cursor) {
			expect(cursor).to.be.an('object');
			done();
		});
	});

	it('find() should have a usable toArray function', function(done) {
		collection.find({prop: 1}, {}, function(err, cursor) {
			cursor.toArray(function(err, docs) {
				expect(docs).to.be.length(3);
				done();
			});
		});
	});

	it('limit() should limit cursors properly', function(done) {
		collection.find({}, function(err, cursor) {
			cursor.limit(1).toArray(function(err, docs) {
				expect(docs).to.have.length(1);
				done();
			});
		});
	});

	it('skip() should skip cursors properly', function(done) {
		collection.find({}, function(err, cursor) {
			cursor.limit(1).skip(1).toArray(function(err, docs) {
				expect(docs).to.have.length(1);
				done();
			});
		});
	});

	it('findOne() should find a document with no options', function(done) {
		collection.findOne({prop: 3}, function(err, doc) {
			expect(doc).to.be.an('object');
			done();
		});
	});

	it('findOne() should find a document with options', function(done) {
		collection.findOne({prop: 3}, {}, function(err, doc) {
			expect(doc).to.be.an('object');
			done();
		});
	});

	it('findAndModify() should find and update the document sucessfully', function(done) {
		collection.findAndModify({more: 4}, {prop: 1}, {$set: {more: 5}}, {}, function(err, result) {
			expect(result).to.be.an('object');
			done();
		});
	});

	it('findAndModify() should find and remove the document successfully', function(done) {
		collection.findAndModify({more: 5}, {prop: 1}, {}, {remove: true}, function(err, result) {
			expect(result).to.equal(1);
			done();
		});
	});

	it('update() should update a document without options', function(done) {
		collection.update({prop: 3}, {$set: {prop: 4}}, function(err, result) {
			expect(result).to.equal(1);
			done();
		});
	});

	it('update() should update a document with options', function(done) {
		collection.update({prop: 4}, {$set: {prop: 3}}, {}, function(err, result) {
			expect(result).to.equal(1);
			done();
		});
	});

	it('update() should fail when it can\'t find a document', function(done) {
		collection.update({prop: 55}, {$set: {prop: 3}}, function(err, result) {
			expect(result).to.equal(0);
			done();
		});
	});

	it('update() should upsert when it can\'t find a document', function(done) {
		collection.update({prop: 55}, {$set: {prop: 3}}, {upsert: true}, function(err, result) {
			expect(result).to.equal(1);
			done();
		});
	});

	it('update() should return array when it can\'t insert a document and modify is enabled', function(done) {
		collection.update({prop: 56}, {$set: {prop: 3}}, {upsert: false, modify: true}, function(err, result) {
			expect(result).to.have.length(0);
			done();
		});
	});

	it('update() should update multiple documents when multi is enabled', function(done) {
		collection.update({prop: 3}, {$set: {prop: 4}}, {multi: true}, function(err, result) {
			expect(result).to.equal(2);
			done();
		});
	});

	it('update() should update and return multiple documents when modify and multi are enabled', function(done) {
		collection.update({prop: 4}, {$set: {prop: 3}}, {multi: true, modify: true}, function(err, result) {
			expect(result).to.have.length(2);
			done();
		});
	});

	it('remove() should be able to be called without options', function(done) {
		collection.remove({prop: 33}, function(err, result) {
			expect(result).to.equal(0);
			done();
		});
	});

	it('remove() should remove only one document if single is enabled', function(done) {
		collection.remove({prop: 3}, {single: true}, function(err, result) {
			expect(result).to.equal(1);
			done();
		});
	});

	it('remove() should not remove any documents when single is enabled and the query cant be matched', function(done) {
		collection.remove({prop: 33}, {single: true}, function(err, result) {
			expect(result).to.equal(0);
			done();
		});
	});

	it('remove() should remove all document if single is disabled', function(done) {
		collection.remove({more: 2}, {single: false}, function(err, result) {
			expect(result).to.equal(2);
			done();
		});
	});
});