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

        logger.info('Client %d: connect', socket.connection.id);
    },
    handleRead: function(data) {
        var socket, buffer, connection;
        buffer = BSON.deserialize(data[0]);
        socket = data[1];

        socket.connection.data = buffer.data;

        // запускаем обработку комманды
        ManagerCommands.handle(buffer.cmd, [buffer.data, socket]);

        logger.info('Client %d: command "%s" data ' + util.inspect(buffer.data), socket.connection.id, buffer.cmd);
    },
    handleClose: function(socket) {
        logger.info('Client %d: disconnect', socket.connection.id);

        GameController.connections.splice(GameController.connections.indexOf(socket), 1);
        GameController.broadcast(BSON.serialize({
            cmd: ManagerCommands.commands.CLIENT.DISCONNECT,
            data: {client: socket.connection.id}
        }));
    }
});

_connectClient = new ConnectClientHandler();
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.CONNECT, _connectClient.handleConnect);
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.READ, _connectClient.handleRead);
CommandHandlerClass.register(ManagerCommands.commands.CLIENT.CLOSE, _connectClient.handleClose);

module.exports = _connectClient;