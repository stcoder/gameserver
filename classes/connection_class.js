var ConnectionClass, baseClass, util, net;

baseClass = require('./../library/baseClass');
util = require('util');
net = require('net');

ConnectionClass = function(id, socket) {
  baseClass.Class.call(this);

  this.id = id;
  this.socket = socket;
};

util.inherits(ConnectionClass, baseClass.Class);

module.exports = function(id, socket) {
  return new ConnectionClass(id, socket);
};