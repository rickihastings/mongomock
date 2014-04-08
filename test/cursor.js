var Lab = require('lab'),
	cursor = require('../lib/cursor.js').Cursor,
	Cursor = new cursor([
		{ prop: 1, more: 2, _id: '534443fc693f04530a5c10cb' },
		{ prop: 1, more: 4, _id: '534443fc693f04530a5c10cc' },
		{ prop: 1, more: 2, _id: '534443fc693f04530a5c10cd' },
		{ prop: 3, _id: '534443fc693f04530a5c10ce' }
	]);

var describe = Lab.experiment,
	it = Lab.test,
	expect = Lab.expect,
	before = Lab.before,
	beforeEach = Lab.beforeEach,
	after = Lab.after;

describe('Cursor', function() {
	it('limit() should add limit: n to options', function(done) {
		Cursor.limit(2);
		expect(Cursor.options.limit).to.be.a('number');
		done();
	});

	it('skip() should add skip: n to options', function(done) {
		Cursor.skip(1);
		expect(Cursor.options.skip).to.be.a('number');
		done();
	});

	it('sort() should add sort: n to options', function(done) {
		Cursor.sort({more: 1});
		expect(Cursor.options.sort).to.be.an('object');
		done();
	});

	it('toArray() should work with a callback', function(done) {
		Cursor.toArray(function(err, results) {
			expect(results).to.have.length(2);
			done();
		});
	});
});