var BaseClass = require('basejs');
var _ = require('underscore');

var PlayersClass = BaseClass.extend({
    constructor: function() {
        this.players = [];
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
    broadcast: function(buffer) {
        _.each(this.players, function(player) {
            player.send(buffer);
        });
    }
});

module.exports = new PlayersClass();