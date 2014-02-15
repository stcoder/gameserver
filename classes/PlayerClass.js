var BaseClass = require('basejs');
var PlayerState = require('./../game/PlayerState');
var Vector = require('vector').Vector;
var Quaternion = require('quaternionjs');
var Target = require('./TargetClass');
var TargetsType = require('./../game/TargetsType');
var Timer = require('./TimerClass');

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
        this.startPosition = new Vector(0, 0, 0);

        // Текущий поворот
        this.rotation = new Quaternion(0, 0, 0, 0);

        // Время затрачиваемое на поворот
        this.rotationTime = 0;

        // Время старта поворота
        this.rotationTimeStart = 0;

        // Время конца поворота
        this.rotationTimeEnd = 0;

        // Время затрачиваемое на перемещение
        this.moveTime = 0;

        // Время старта перемещения
        this.moveTimeStart = 0;

        // Время конца перемещения
        this.moveTimeEnd = 0;

        this.angle = 0;


        // Направление
        this.direction = new Vector(0, 0, 0);

        // Позиция для точки к перемещению
        this.positionMovePoint = new Vector(0, 0, 0);

        // Цель
        this.target = new Target(null);

        // Скорость перемещения
        this.speedMove = 0.3;

        // Скорость поворота
        this.speedRotation = 10.3;

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
        this.startPosition = this.position;
        this.positionMovePoint = new Vector(x, y, z);

        this.direction = Vector.sub(this.positionMovePoint, this.startPosition);
        this.direction.y = 0;
        this.angle = Vector.angle(this.direction, new Vector(0, 0, 1.0));
        this.rotationTimeStart = Timer.getCurrentDate().unix();
        this.rotationTime = this.angle / this.speedRotation;
        this.rotationTimeEnd = this.rotationTimeStart + (this.rotationTime * 1000);

        this.moveTimeStart = this.rotationTimeEnd;
        var distance = Vector.distance(this.startPosition, this.positionMovePoint);
        this.moveTime = distance / this.speedMove;
        this.moveTimeEnd = this.moveTimeStart + (this.moveTime * 1000);

        this.state = PlayerState.move;
    },
    move: function(date) {
        var currentTimestamp = date.unix();
        var state = PlayerState.wait;

        if (this.rotationTimeEnd > currentTimestamp) {
            state = PlayerState.rotation;
        } else if (this.rotationTimeEnd <= currentTimestamp) {
            if (this.moveTimeEnd > currentTimestamp) {
                state = PlayerState.move;
            } else if (this.moveTimeEnd <= currentTimestamp) {
                state = PlayerState.wait;
            }
        }

        this.state = state;
    },
    update: function(tick, date) {
        var state = null;

        console.log('--- player update ---');

        this.move(date);

        return state;
    }
});

module.exports = PlayerClass;