var BaseClass = require('basejs');
var _ = require('underscore');
var bson = require('bson').pure().BSON;

var PacketClass = BaseClass.extend({
    constructor: function(command, data) {
        this.command = command;
        this.data = data;
    },
    getBuffer: function() {
        return bson.serialize({command: this.command, data: this.data});
    }
}, {
    createFromBuffer: function(buffer) {
        var buffer = bson.deserialize(buffer);
        var command = buffer.command;
        var data = buffer.data;

        var packet = new PacketClass(command, data);
        return packet;
    }
});

module.exports = PacketClass;