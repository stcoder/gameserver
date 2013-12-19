var config, log, util, net, GameController;

config = require('./../library/config');
log = require('./../library/logger')(module);
util = require('util');
net = require('net');

GameController = function() {
    this.connections = [];
    this.netServer = null;
};

GameController.prototype.init = function() {
  var _that;

  _that = this;
  this.netServer = net.createServer();
  this.netServer.on('connection', function(socket) {
    var connection = require('./../classes/connection_class')(socket.id, socket);
    console.log(socket.id, socket);
  });
};

GameController.prototype.run = function() {
  this.netServer.listen(config.get('server:port'), function() {
    log.info('server start in port ' + config.get('server:port'));
  });
};

module.exports = new GameController();