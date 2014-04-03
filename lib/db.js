var _ = require('lodash'),
	Collection = require('./collection').Collection,
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function Db(name) {
	/* again, we don't really need to implement options here.. right now anyway */
};

util.inherits(Db, EventEmitter);
// inherit from an event emitter

Db.prototype.collectionNames = function(name) {
	if (!name) {
		return _.keys(DataStore);
	}

	return _.keys(_.pick(DataStore, name));
};

Db.prototype.collections = function(callback) {
	var keys = this.collectionNames(),
		cols = [];

	_.forEach(keys, function(key) {
		cols.push(DataStore[key]);
	});

	if (typeof callback !== 'function') {
		return cols;
	} else {
		callback(null, cols);
	}
};

Db.prototype.collection = function(name, options, callback) {
	var self = this;
	
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	
	if (name in DataStore) {
		var collection = DataStore[name];
	} else {
		try {
			var collection = new Collection(name);
		} catch (e) {
			return callback(e, null);
		}
	}

	if (typeof callback !== 'function') {
		return collection;
	} else {
		callback(null, collection);
	}
};

Db.prototype.dropCollection = function(name, callback) {
	var callback = callback || (callback = function(){});

	if (name in DataStore) {
		delete DataStore[name];
	} else {
		callback(null, false);
	}

	callback(null, true);
};

Db.prototype.renameCollection = function(fromCollection, toCollection, options, callback) {

};

exports.Db = Db;