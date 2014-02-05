var CommandHandlerClass = require('./../../classes/CommandHandlerClass');
var ManagerCommands = require('./../ManagerCommands');
var Log = require('./../../library/logger')(module);
var Config = require('./../../library/config');
var _ = require('underscore');
var Players = require('./../../classes/PlayersClass');
var Packets = require('./../Packets');

var PlayerHandler = CommandHandlerClass.extend({}, {
    handleRead: function(data) {
        var player = data[0];
        var packet = data[1];

        // TODO: проверить, есть ли доступ к команде

        ManagerCommands.handle(packet.command, [player, packet.data]);

        Log.info("PlayerID: " + player.id + " read");
    },
    handlePing: function(data) {
        var player = data[0];
        var data = data[1];

        if (player.timePingStart === 0) {
            player.timePingStart = Date.now();
        } else {
            var currentTime = Date.now();
            var diffTime = (currentTime - player.timePingStart) + 5 - 20;
            player.ping = (diffTime <= 5) ? 5 : diffTime;
            Log.info("PlayerID: " + player.id + " ping: " + player.ping);
        }
    },
    handleMove: function(data) {
        var player = data[0];
        var data = data[1];

        player.setPositionMovePoint(data.move_to.x, data.move_to.y, data.move_to.z);
        player.move();

        // сделать всякие проверки но сейчас просто отправить пакет разрешающий движение
        var packet = Packets.playerMove(player);
        Players.broadcast(packet.getBuffer());
    }
});
CommandHandlerClass.register(ManagerCommands.commands.PLAYER.READ, PlayerHandler.handleRead);
CommandHandlerClass.register(ManagerCommands.commands.PLAYER.PING, PlayerHandler.handlePing);
CommandHandlerClass.register(ManagerCommands.commands.PLAYER_ACTION.MOVE, PlayerHandler.handleMove);

module.exports = PlayerHandler;