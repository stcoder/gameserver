var Class, events, util;

events = require('events');
util = require('util');

Class = function() {
  events.EventEmitter.call(this);
};

util.inherits(Class, events.EventEmitter);

module.exports.Class = Class;