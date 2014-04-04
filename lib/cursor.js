var _ = require('lodash'),
	filter = require('mockgoose/lib/options/Options');

function Cursor(results) {
	this.results = results;
	this.options = {};
};

Cursor.prototype.toArray = function(callback) {
	this.results = filter.applyOptions(this.options, this.results);
	callback(null, this.results);
	return this;
};

Cursor.prototype.limit = function(n) {
	this.options = _.extend(this.options, {limit: n});
	return this;
};

Cursor.prototype.skip = function(n) {
	this.options = _.extend(this.options, {skip: n});
	return this;
};

Cursor.prototype.sort = function(n) {
	this.options = _.extend(this.options, {sort: n});
	return this;
};

exports.Cursor = Cursor;