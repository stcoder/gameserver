var config,
    log,
    util,
    net,
    GameController,
    ManagerCommands,
    BaseClass;

config = require('./../library/config');
log = require('./../library/logger')(module);
util = require('util');
net = require('net');
ManagerCommands = require('./ManagerCommands');
BaseClass = require('basejs');

GameController = BaseClass.extend({
  constructor: function() {
    this.connections = [];
    this.netServer = null;
  },
  init: function() {
    ManagerCommands.loadHandlers();

    this.netServer = net.createServer();
    this.netServer.on('connection', function(socket) {
      ManagerCommands.handle(ManagerCommands.commands.CLIENT.CONNECT, socket);

      socket.on('data', function(buffer) {
        ManagerCommands.handle(ManagerCommands.commands.CLIENT.READ, [buffer, socket]);
      });

      socket.on('close', function() {
        ManagerCommands.handle(ManagerCommands.commands.CLIENT.CLOSE, socket);
      });
    });
  },
  run: function() {
    this.netServer.listen(config.get('server:port'), function() {
      ManagerCommands.handle(ManagerCommands.commands.SYSTEM.SERVER_START);
    });
  },
  broadcast: function(buffer) {
    for(index in this.connections) {
      var connection;
      connection = this.connections[index].connection;
      connection.send(buffer);
    }
  }
});

module.exports = new GameController();