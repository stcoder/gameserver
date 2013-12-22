var config, log, util, net, GameController, ManagerActions;

config = require('./../library/config');
log = require('./../library/logger')(module);
util = require('util');
net = require('net');
ManagerActions = require('./ManagerActions');

GameController = function() {
    this.connections = [];
    this.netServer = null;
};

GameController.prototype.init = function() {
  var _this;

  _this = this;
  this.netServer = net.createServer();
  this.netServer.on('connection', function(socket) {
    var connection = require('./../classes/connection_class')(socket.remotePort, socket);
    _this.connections.push(connection);

    socket.on('close', function(socket) {
      connection.close(socket);
    });

    socket.on('data', function(buffer) {
      var rawData = connection.readBuffer(buffer);
      ManagerActions.handle(rawData.command, rawData.data);
    });
  });
};

GameController.prototype.run = function() {
  this.netServer.listen(config.get('server:port'), function() {
    log.info('server start in port ' + config.get('server:port'));
  });
};

module.exports = new GameController();