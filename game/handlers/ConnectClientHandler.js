var CommandHandlerClass,
    ConnectClientHandler,
    ManagerCommands,
    _connectClient,
    BSON,
    ConnectionClass,
    logger,
    util,
    GameController;

CommandHandlerClass = require('./../../classes/CommandHandlerClass');
ManagerCommands = require('./../ManagerCommands');
BSON = require('bson').BSONNative.BSON;
ConnectionClass = require('./../../classes/ConnectionClass');
GameController = require('./../GameController');
logger = require('./../../library/logger')(module);
util = require('util');


ConnectClientHandler = CommandHandlerClass.extend({
    handleConnect: function(socket) {
        var connection = new ConnectionClass(socket.remotePort, socket);
        socket.connection = connection;
        GameController.connections.push(socket);

        // random position
        connection.position = [
            Math.floor(Math.random() * (10 - 1 + 1)) + 1,
            Math.floor(Math.random() * (10 - 1 + 1)) + 1,
            Math.floor(Math.random() * (10 - 1 + 1)) + 1
        ];
        connection.startPing = Date.now();

        logger.info('Client %d: connect', socket.connection.id);
    },
    handleRead: function(data) {
        var socket, buffer, connection;
        buffer = BSON.deserialize(data[0]);
        socket = data[1];

        socket.connection.data = buffer.data;

        logger.info('Client %d: command "%s" data ' + util.inspect(buffer.data), socket.connection.id, buffer.cmd);

        // запускаем обработку комманды
        ManagerCommands.handle(buffer.cmd, [buffer.data, socket]);
    },
    handleClose: function(socket) {
        logger.info('Client %d: disconnect', socket.connection.id);

        GameController.connections.splice(GameController.connections.indexOf(socket), 1);
        GameController.broadcast(BSON.serialize({
            cmd: ManagerCommands.commands.CLIENT.DISCONNECT,
            data: {client: socket.connection.id}
        }));
    },
    handlePing: function(data) {
        socket = data[1];

        socket.connection.ping = Date.now() - socket.connection.startPing;
        socket.connection.startPing = 0;

        logger.info('Client %d: ping: %d', socket.connection.id, socket.connection.ping);
    }
});

_connectClient = new ConnectClientHandler();
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.CONNECT, _connectClient.handleConnect);
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.READ, _connectClient.handleRead);
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.CLOSE, _connectClient.handleClose);
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.PING, _connectClient.handlePing);

module.exports = _connectClient;