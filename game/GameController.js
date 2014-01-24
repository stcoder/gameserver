var BaseClass = require('basejs');
var _ = require('underscore');
var NetServer = require('./../classes/NetServerClass');
var Players = require('./../classes/PlayersClass');
var Player = require('./../classes/PlayerClass');
var BSON = require('bson').BSONNative.BSON;
var Packet = require('./../classes/PacketClass');
var Packets = require('./Packets');
var ManagerCommands = require('./ManagerCommands');
var Log = require('./../library/logger')(module);
var Config = require('./../library/config');
var Util = require('util');

var GameController = BaseClass.extend({
    constructor: function() {
        this.players = Players;
        this.server = new NetServer(Config.get('server:port'));

        // tick
        this.tickCount = 0;
        this.tickInterval = Config.get('game:tick_interval');
        this.tickTimer = null;

        var _this = this;

        this.server.init();

        // вешаем событие на подключение игрока
        this.server.events.on(NetServer.EVENTS.connection, function(data) {
            var socket = data[0];

            // создаем объект игрока с временным id
            var player = new Player(socket.remotePort);
            player.socket = socket;

            // уведомляем подключившего игрока об успешном коннекте
            var packetPlayerConnected = Packets.playerConnected(player);
            player.send(packetPlayerConnected.getBuffer());

            // уведомляем всех игроков о новом игроке
            var packetPlayerNewConnected = Packets.playerNewConnected(player);
            _this.players.broadcast(packetPlayerNewConnected.getBuffer());

            // добавляем в список игроков
            _this.players.add(player);

            Log.info("PlayerID: " + player.id + " connected");
        });

        // вешаем событие на отключение игрока
        this.server.events.on(NetServer.EVENTS.close, function(data) {
            var socket = data[0];
            var player = _this.players.findBySocket(socket);

            // удаляем игрока из массива
            _this.players.remove(player);
            
            // создаем пакет котрый уведомит всех игроков об отключении игрока
            var packet = Packets.playerDisconnect(player);

            _this.players.broadcast(packet.getBuffer());

            Log.info("PlayerID: " + player.id + " disconnected");
        });

        // вешаем событие на получение данных
        this.server.events.on(NetServer.EVENTS.data, function(data) {
            var socket = data[0];
            var sourceBuffer = data[1];
            var packet = Packet.createFromBuffer(sourceBuffer);
            var player = _this.players.findBySocket(socket);

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

        this.tickTimer = setInterval(function() {
            console.info("TickC: " + _this.tickCount);
            _this.tickCount++;
        }, this.tickInterval);
    }
});

module.exports = new GameController();