var CommandHandler, ConnectClientHandler;

CommandHandler = require('./../CommandHandler');

ConnectClientHandler = CommandHandler.extend({
    handle: function(params) {
        console.log('client connected', params);
    }
});

module.exports = function(ManagerCommands) {
    var CCH = new ConnectClientHandler();
    CCH.register(ManagerCommands, ManagerCommands.commands.CLIENT.CONNECT, CCH.handle);
};