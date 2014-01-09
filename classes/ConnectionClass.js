var ConnectionClass, BaseClass;

BaseClass = require('basejs');

ConnectionClass = BaseClass.extend({
    constructor: function(id, socket) {
        this.id = id;
        this.socket = socket;
        this.data = {};

        this.position = [0, 0, 0];
        this.movePosition = [0, 0, 0];
        this.move = false;
        this.speed = 0.3;
    },
    send: function(buffer) {
        this.socket.write(buffer);
    }
});

module.exports = ConnectionClass;