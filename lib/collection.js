var _ = require('lodash'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function Collection(name, db) {
	db._client.DataStore[name] = this;

	this._db = db;
	this._name = name;
};

util.inherits(Collection, EventEmitter);
// inherit from an event emitter



exports.Collection = Collection;