var BaseClass, CommandHandlerClass, ManagerCommands;

BaseClass = require('basejs');
ManagerCommands = require('./../game/ManagerCommands');

CommandHandlerClass = BaseClass.extend({
    constructor: function() {}
}, {
    register: function(command, callback) {
        ManagerCommands.registerHandler(command, callback);
    }
});

module.exports = CommandHandlerClass;