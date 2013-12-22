var ConnectionClass, baseClass, util, net, bson;

baseClass = require('./../library/baseClass');
util = require('util');
net = require('net');
bson = require('bson').BSONPure.BSON;

ConnectionClass = {
  id: null,
  socket: null,
  data: {},
  cmd: null,

  create: function(id, socket) {
    this.id = id;
    this.socket = socket;
    return this;
  },

  close: function() {

  },

  readBuffer: function(buffer) {
    var tmp = bson.deserialize(buffer);
    // TODO: сделать проверку на существующие данные
    return {
      command: tmp.command,
      data: tmp.data
    };
  }
};

module.exports = function(id, socket) {
  return ConnectionClass.create(id, socket);
};