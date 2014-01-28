var BaseClass = require('basejs');
var Config = require('./../library/config');
var Path = require('path');
var Events = require('events');
var Emitter = new Events.EventEmitter();
var RequireTree = require('require-tree');

ManagerCommands = BaseClass.extend({
    constructor: function() {
        // загружаем файл с коммандами
        this.commands = require(Path.join(Config.get('root_dir'), Config.get('server:commands_file')));
        this.actions = require(Path.join(Config.get('root_dir'), Config.get('server:actions_file')));
        this.handlers = {};
    },
    loadHandlers: function() {
        // загрузить всех обработчиков
        this.handlers = RequireTree('./handlers/', {filter: /\.*?Handler\.js/});
    },
    registerHandler: function(command, handler) {
        // зарегистрировать обработчик
        Emitter.on('EVENT_COMMAND_x' + command, handler);
    },
    handle: function(command, params) {
        // запустить обработку
        Emitter.emit('EVENT_COMMAND_x' + command, params);
    }
});

module.exports = new ManagerCommands();