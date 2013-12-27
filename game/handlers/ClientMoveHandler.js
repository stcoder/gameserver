var ClientMoveHandler,
    CommandHandlerClass,
    ManagerCommands,
    _clientMove;

ManagerCommands = require('./../ManagerCommands');
CommandHandlerClass = require('./../../classes/CommandHandlerClass');

ClientMoveHandler = CommandHandlerClass.extend({
    handleMove: function(datas) {
        console.log(datas);
    }
});

_clientMove = new ClientMoveHandler();
CommandHandlerClass.register(ManagerCommands.commands.CLIENT_ACTION.MOVE, _clientMove.handleMove);

module.exports = _clientMove;