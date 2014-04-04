var _ = require('lodash'),
	util = require('util'),
	utils = require('mockgoose/lib/utils'),
	operations = require('mockgoose/lib/operations/Operations'),
	Cursor = require('./cursor').Cursor,
	EventEmitter = require('events').EventEmitter;

function Collection(name, db) {
	db._client.DataStore[name] = this;

	this._db = db;
	this._name = name;
	this._storage = {};
};

util.inherits(Collection, EventEmitter);
// inherit from an event emitter

Collection.prototype.insert = function(docs, options, callback) {
	var self = this,
		insert = [];

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!_.isArray(docs)) {
		insert.push(docs);
	} else {
		insert = docs;
	}

	_.each(insert, function(doc) {
		doc._id = new self._db._client.ObjectID();
		self._storage[doc._id] = doc;
	});

	callback(null, insert);
};

Collection.prototype.find = function(conditions, options, callback) {
	var self = this,
		models = this._storage,
		results = [];

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!_.isEmpty(conditions)) {
		results = utils.findModelQuery(models, conditions);
	} else {
		results = utils.objectToArray(utils.cloneItems(models));
	}

	var result = new Cursor(results);

	callback(null, result);
};

Collection.prototype.findOne = function(conditions, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	this.find(conditions, options, function(err, cursor) {
		cursor.toArray(function(err, results) {
			callback(err, results[0]);
		});
	});
};

Collection.prototype.findAndModify = function(conditions, sort, castedDoc, options, callback) {
	if (options.remove) {
		this.remove(conditions, options, callback);
	} else {
		options.modify = true;
		this.update(conditions, castedDoc, options, function (err, results) {
			callback(err, results[0]);
		});
	}
};

Collection.prototype.update = function(conditions, update, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var self = this;
	options.conditions = conditions;
	
	this.find(conditions, options, function(err, cursor) {
		cursor.toArray(function(err, results) {
			if (!results.length) {
				if (options.upsert) {
					self.insert({}, options, function (err, result) {
						updateFoundItems(self, options, result, update, callback);
					});
				} else {
					callback(null, options.modify ? [] : 0);
				}
			} else {
				updateFoundItems(self, options, results, update, callback);
			}
		});
	});
};

Collection.prototype.remove = function (conditions, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var self = this;

	this.find(conditions, options, function(err, results) {
		results.toArray(function(err, results) {
			if (options.single) {
				if (results.length) {
					results = results[0];
					delete self._storage[results._id];
					results = [results];
				} else {
					results = [];
				}
			} else {
				_.each(results, function (result) {
					delete self._storage[result._id];
				});
			}

			callback(null, results.length);
		});
	});
};

function getOperation(type) {
	return operations.getOperation(type);
}

function updateFoundItems(self, options, results, update, callback) {
	if (!options.multi) {
		results = [results[0]];
	}
	
	updateResults(self, results, update, options);
	callback(null, options.modify ? results : results.length);
}

function updateResults(self, results, update, options) {
	_.each(results, function (result) {
		updateResult(result, update, options);
		self._storage[result._id] = result;
	});
}

function updateResult(result, update, options) {
	_.forIn(update, function (update, type) {
		getOperation(type)(result, update, options);
	});
}

exports.Collection = Collection;