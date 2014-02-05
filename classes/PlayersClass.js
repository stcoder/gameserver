var BaseClass = require('basejs');
var _ = require('underscore');
var Packet = require('./PacketClass');

var PlayersClass = BaseClass.extend({
    constructor: function() {
        this.players = [];
    },
    getAll: function() {
        return this.players;
    },
    showPlayers: function(format) {
        format = format || 'id';
        console.log("Players: " + require('util').inspect(_.pluck(this.players, format), {colors: true}));
    },
    add: function(player) {
        this.players.push(player);
    },
    remove: function(player) {
        var index = _.indexOf(this.players, player);
        this.players.splice(index, 1);
    },
    findById: function(id) {
        return _.find(this.players, function(player) {
            if (player.id === id) {
                return true;
            }

            return false;
        });
    },
    findBySocket: function(socket) {
        return _.find(this.players, function(player) {
            if (_.isEqual(player.socket, socket)) {
                return true;
            }

            return false;
        });
    },
    broadcast: function(buffer, callback) {
        _.each(this.players, function(player) {
            if (callback) {
                callback(player);
            }
            player.send(buffer);
        });
    },
    update: function(tick, date) {
        var packet = new Packet(null, []);
        // обновляем данные всех игроков
        _.each(this.players, function(player) {
            var state = player.update(tick, date);
            if (state) {
                packet.pushData(state);
            }
        });

        // формируем пакет

        // отправляем пакет всем игрокам
        console.log("Players update, tick: " + tick + " in time: " + date.format("H:m:s"));
    }
});

module.exports = new PlayersClass();