var ClientMoveHandler,
    CommandHandlerClass,
    ManagerCommands,
    _clientMove;

ManagerCommands = require('./../ManagerCommands');
CommandHandlerClass = require('./../../classes/CommandHandlerClass');

ClientMoveHandler = CommandHandlerClass.extend({
    handleMove: function(datas) {
        var data, socket, conn;
        data = datas[0];
        socket = datas[1];
        conn = socket.connection;

        conn.movePosition = data;
        conn.move = true;
    },
    move: function(conn, from, to) {
        if (from[0] < to[0]) {
            conn.position[0] += 0.5 * conn.speed;
        }
        if (from[1] < to[1]) {
            conn.position[1] += 0.5 * conn.speed;
        }
        if (from[2] < to[2]) {
            conn.position[2] += 0.5 * conn.speed;
        }
        if (
                conn.position[0] >= to[0] &&
                conn.position[1] >= to[1] &&
                conn.position[2] >= to[2]
            ) {
            conn.move = false
        }
    }
});

_clientMove = new ClientMoveHandler();
CommandHandlerClass.register(ManagerCommands.commands.CLIENT_ACTION.MOVE, _clientMove.handleMove);

module.exports = _clientMove;