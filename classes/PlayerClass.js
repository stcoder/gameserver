var BaseClass = require('basejs');
var PlayerState = require('./../game/PlayerState');
var Vector = require('vector').Vector;
var Target = require('./TargetClass');
var TargetsType = require('./../game/TargetsType');

var PlayerClass = BaseClass.extend({
    constructor: function(id) {
        this.id = id;

        // Логин игрока, будет браться из базы
        this.login = '';

        // Сокет подключения
        this.socket = null;

        // Время старта сессии
        this.timeStartSession = Date.now();

        // Текущий стейт игрока
        this.state = PlayerState.wait;

        // Текущая позиция игрока
        this.position = new Vector(0, 0, 0);

        // Старая позиция игрока
        this.oldPosition = new Vector(0, 0, 0);

        // Направление
        this.direction = 0;

        // Позиция для точки к перемещению
        this.positionMovePoint = new Vector(0, 0, 0);

        // Цель
        this.target = new Target(null);

        // Скорость игрока
        this.speed = 0.3;

        // Пинг
        this.ping = 0;

        // Время для вычисления пинга
        this.timePingStart = 0;

        // Тип объекта
        this.type = TargetsType.player;
    },
    send: function(buffer) {
        this.socket.write(buffer);
    }
});

module.exports = PlayerClass;