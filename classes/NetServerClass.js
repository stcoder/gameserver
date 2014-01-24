var BaseClass = require('basejs');
var _ = require('underscore');
var net = require('net');
var util = require('util');
var events = require('events');

var NetServerClass = NetServer = BaseClass.extend({
    constructor: function(port) {
        this.port = port;
        this.connections = [];
        this.server = null;
        this.events = new events.EventEmitter;
    },
    init: function() {
        var _this = this;
        this.server = net.createServer();
        this.server.on('connection', function(socket) {
            _this.events.emit(NetServer.EVENTS.connection, [socket]);
            _this.connections.push(socket);

            socket.on('data', function(data) {
                _this.events.emit(NetServer.EVENTS.data, [socket, data]);
            });

            socket.on('close', function() {
                _this.events.emit(NetServer.EVENTS.close, [socket]);
                _this.connections.splice(_.indexOf(_this.connections, socket), 1);
            });
        });
    },
    start: function() {
        var _this = this;
        this.server.listen(_this.port, function() {
            _this.events.emit(NetServer.EVENTS.start, [_this.port]);
        });
    }
}, {
    EVENTS: {
        connection: 1,
        data: 2,
        close: 3,
        start: 4
    }
});

module.exports = NetServerClass;