var BaseClass = require('basejs');
var _ = require('underscore');
var NetServer = require('./../classes/NetServerClass');
var Players = require('./../classes/PlayersClass');
var Player = require('./../classes/PlayerClass');
var Packet = require('./../classes/PacketClass');
var Packets = require('./Packets');
var ManagerCommands = require('./ManagerCommands');
var Log = require('./../library/logger')(module);
var Config = require('./../library/config');
var Util = require('util');
var Timer = require('./../classes/TimerClass');

var GameController = BaseClass.extend({
    constructor: function() {
        this.server = new NetServer(Config.get('server:port'));

        // загружаем обработчики
        ManagerCommands.loadHandlers();

        // tick
        this.tickCount = 0;

        // количество тиков в секунду
        this.countTickInSecond = Config.get('game:count_tick_in_second');
        this.tickTimer = null;

        var _this = this;

        this.server.init();

        // вешаем событие на подключение игрока
        this.server.events.on(NetServer.EVENTS.connection, function(data) {
            var socket = data[0];

            // создаем объект игрока с временным id
            var player = new Player(socket.remotePort);
            console.log(player.position);
            player.position = player.getRandomPosition(60, 10);
            console.log(player.position);
            player.socket = socket;

            // уведомляем подключившего игрока об успешном коннекте
            var packetPlayerConnected = Packets.playerConnected(player, Players.getAll());
            player.send(packetPlayerConnected.getBuffer());

            // уведомляем всех игроков о новом игроке
            var packetPlayerNewConnected = Packets.playerNewConnected(player);
            Players.broadcast(packetPlayerNewConnected.getBuffer());

            // добавляем в список игроков
            Players.add(player);

            // передаем команду другим обработчикам
            ManagerCommands.handle(ManagerCommands.commands.PLAYER.CONNECTED, [player]);

            Log.info("PlayerID: " + player.id + " connected");
        });

        // вешаем событие на отключение игрока
        this.server.events.on(NetServer.EVENTS.close, function(data) {
            var socket = data[0];
            var player = Players.findBySocket(socket);

            // удаляем игрока из массива
            Players.remove(player);
            
            // создаем пакет котрый уведомит всех игроков об отключении игрока
            var packet = Packets.playerDisconnect(player);

            Players.broadcast(packet.getBuffer());

            // передаем команду другим оработчикам
            ManagerCommands.handle(ManagerCommands.commands.PLAYER.CLOSE, [player, socket]);

            Log.info("PlayerID: " + player.id + " disconnected");
        });

        // вешаем событие на получение данных
        this.server.events.on(NetServer.EVENTS.data, function(data) {
            var socket = data[0];
            var sourceBuffer = data[1];
            var packet = Packet.createFromBuffer(sourceBuffer);
            var player = Players.findBySocket(socket);

            // передаем команду другим обработчикам
            ManagerCommands.handle(ManagerCommands.commands.PLAYER.READ, [player, packet]);

            Log.info("PlayerID: " + player.id + " say: " + Util.inspect(packet));
        });

        // вешаем событие на запуск сервера
        this.server.events.on(NetServer.EVENTS.start, function(data) {
            var port = data[0];
            Log.info("Server started on port: " + port);
        });
    },
    run: function() {
        var _this = this;
        this.server.start();
        Timer.runTimer(function(tick, date) {
            if (tick % 20 === 0) {
                var timeStartSendPacket = Date.now();
                var packetPlayerPing = Packets.playerPing();

                Players.broadcast(packetPlayerPing.getBuffer(), function(player) {
                    player.timePingStart = timeStartSendPacket;
                });

                Log.info("TICK: " + tick + " send packet PlayerPing");
            }

            if (tick % 5 === 0) {
                Players.update(tick, date);
            }

            if (tick % 80 === 0) {
                Log.info("STATE");
            }
        });
    }
});

module.exports = new GameController();