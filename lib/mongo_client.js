var _ = require('lodash'),
	db = require('./db').Db,
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function MongoClient(serverConfig, options) {
	
	/* we barely need to do anything here
	 * because we don't actually care about anything apart from storing the data
	 * so, we'll just empty the data store each time this is called */
};

util.inherits(MongoClient, EventEmitter);
// inherit from an event emitter

MongoClient.prototype.connect = function(url, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!callback) {
		throw new Error('MongoClient.connect() needs a callback');
	}

	callback(null, new db());
};

exports.MongoClient = MongoClient;