var _ = require('lodash'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function Collection(name) {
	if (name in DataStore) {
		throw new Error('Collection ' + name + ' already exists');
	}

	this.prop = 1;
	DataStore[name] = this;
};

util.inherits(Collection, EventEmitter);
// inherit from an event emitter



exports.Collection = Collection;