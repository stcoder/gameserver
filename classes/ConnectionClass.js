var ConnectionClass, BaseClass;

BaseClass = require('basejs');

ConnectionClass = BaseClass.extend({
    constructor: function(id, socket) {
        this.id = id;
        this.socket = socket;
        this.data = {};
    },
    send: function(buffer) {
        this.socket.write(buffer);
    }
});

module.exports = ConnectionClass;