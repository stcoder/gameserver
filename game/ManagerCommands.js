var BaseClass, ManagerCommands, config, path, events, emitter, requireTree;

BaseClass = require('basejs');
config = require('./../library/config');
path = require('path');
events = require('events');
emitter = new events.EventEmitter();
requireTree = require('require-tree');

ManagerCommands = BaseClass.extend({
    constructor: function() {
        this.commands = require(path.join(config.get('root_dir'), config.get('server:commands_file')));
    },
    loadHandlers: function() {
        // загрузить всех обработчиков
        var _this = this;
        requireTree('./handlers/', {each: function(obj) {
            obj(_this);
        }});
    },
    registerHandler: function(command, handler) {
        // зарегистрировать обработчик
        emitter.on('EVENT_COMMAND_x' + command, handler);
    },
    handle: function(command, params) {
        // запустить обработку
        emitter.emit('EVENT_COMMAND_x' + command, params);
    }
});

module.exports = new ManagerCommands();