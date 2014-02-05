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
    },
    getRandomPosition: function(max, min) {
        return new Vector(
            Math.floor(Math.random() * (max - min + 1)) + min,
            0.5,
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    },
    setPositionMovePoint: function(x, y, z) {
        this.positionMovePoint = new Vector(x, y, z);
        this.state = PlayerState.move;
    },
    move: function() {
        if (this.state === PlayerState.move) {
            if (Math.floor(Vector.distance(this.position, this.positionMovePoint)) > 0) {
                this.oldPosition = this.position.clone();
                this.direction = Vector.sub(this.positionMovePoint, this.position);
                this.position.add(this.direction.mult(this.speed));
                console.log("PlayerMOVE: " + this.id + " speed: " + this.speed + " distance: " + Math.floor(Vector.distance(this.position, this.positionMovePoint)) + " old position: " + this.oldPosition + " new position: " + this.position);
            } else {
                this.state = PlayerState.wait;
                this.positionMovePoint = new Vector(0, 0, 0);
            }
        }
    },
    update: function(tick, date) {
        var state = null;

        console.log('--- player update ---');

        this.move();

        return state;
    }
});

module.exports = PlayerClass;