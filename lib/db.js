var _ = require('lodash'),
	Collection = require('./collection').Collection,
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function Db(name, client) {
	this._client = client;
	/* again, we don't really need to implement options here.. right now anyway */
};

util.inherits(Db, EventEmitter);
// inherit from an event emitter

Db.prototype.collectionNames = function(name) {
	if (!name) {
		return _.keys(this._client.DataStore);
	}

	return _.keys(_.pick(this._client.DataStore, name));
};

Db.prototype.collections = function(callback) {
	var self = this,
		keys = this.collectionNames(),
		cols = [];

	_.forEach(keys, function(key) {
		cols.push(self._client.DataStore[key]);
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
	
	if (_.has(this._client.DataStore, name)) {
		var collection = this._client.DataStore[name];
	} else {
		var collection = new Collection(name, this);
	}

	if (typeof callback !== 'function') {
		return collection;
	} else {
		callback(null, collection);
	}
};

Db.prototype.dropCollection = function(name, callback) {
	var callback = callback || (callback = function(){});

	if (_.has(this._client.DataStore, name)) {
		delete this._client.DataStore[name];
	} else {
		callback(null, false);
	}

	callback(null, true);
};

Db.prototype.renameCollection = function(fromCollection, toCollection, options, callback) {

};

exports.Db = Db;