var config,
    log,
    util,
    net,
    GameController,
    ManagerCommands,
    BSON,
    BaseClass;

config = require('./../library/config');
log = require('./../library/logger')(module);
util = require('util');
net = require('net');
ManagerCommands = require('./ManagerCommands');
BaseClass = require('basejs');
BSON = require('bson').BSONNative.BSON;

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
    var _this = this;
    this.netServer.listen(config.get('server:port'), function() {
      ManagerCommands.handle(ManagerCommands.commands.SYSTEM.SERVER_START);

      setInterval(function() {
        _this.update(_this);
      }, 1000 / 30);
    });
  },
  broadcast: function(buffer) {
    for(index in this.connections) {
      var connection;
      connection = this.connections[index].connection;
      connection.send(buffer);
    }
  },
  update: function(gc) {
    for(index in gc.connections) {
      var connection;
      conn = gc.connections[index].connection;

      if (conn.move === true) {
        console.log('client id: ' + conn.id + '; position: ' + conn.position);
        ManagerCommands.handlers.ClientMoveHandler.move(conn, conn.position, conn.movePosition);

        gc.broadcast(BSON.serialize({
            cmd: ManagerCommands.commands.CLIENT_ACTION.MOVE,
            data: [conn.id, conn.position]
        }));
      }
    }
  }
});

module.exports = new GameController();