var BaseClass, CommandHandler;

BaseClass = require('basejs');

CommandHandler = BaseClass.extend({
    constructor: function() {},
    register: function(ManagerCommands, command, callback) {
        ManagerCommands.registerHandler(command, callback);
    }
});

module.exports = CommandHandler;