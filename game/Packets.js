var Packet = require('./../classes/PacketClass');
var ManagerCommands = require('./ManagerCommands');
var _ = require('underscore');

// Packets

/**
 * Подключение игрока инициатора
 * 
 * Пакет отправляется игроку который совершил подключение
 */
exports.playerConnected = function(player, players) {
    var data = {
        pid: player.id,
        position: player.position,
        direction: player.direction,
        players: []
    };

    _.each(players, function(p) {
        data.players.push({
            pid: p.id,
            position: p.position,
            direction: p.direction
        })
    });

    var packet = new Packet(ManagerCommands.commands.PLAYER.CONNECTED, data);
    return packet;
};

/**
 * Подключение игрока
 * 
 * Пакет отпровляется всем игрока
 */
exports.playerNewConnected = function(player) {
    var data = {
        pid: player.id,
        position: player.position,
        direction: player.direction
    };

    var packet = new Packet(ManagerCommands.commands.PLAYER.NEWCONNECT, data);
    return packet;
};

/**
 * Отключение игрока инициатора
 *
 * Пакет отправляется игроку который выходит из игры
 */
exports.playerInitiatorDisconnect = function(player) {
    var data = {
        pid: player.id,
        action: ManagerCommands.actions.PLAYER.TOLOGIN // это команда направит игрока на экран логина
    };
    var packet = new Packet(ManagerCommands.commands.PLAYER.DISCONNECT, data);
    return packet;
};

/**
 * Отключение игрока
 *
 * Пакет отправляется всем игрокам
 */
exports.playerDisconnect = function(player) {
    var data = {
        pid: player.id
    };
    var packet = new Packet(ManagerCommands.commands.PLAYER.DISCONNECT, data);
    return packet;
};

/**
 * Пинг игрока
 *
 * Пакет отправляется всем игрокам для вычисления пинга
 */
exports.playerPing = function() {
    var data = {};
    var packet = new Packet(ManagerCommands.commands.PLAYER.PING, data);
    return packet;
};

exports.playerMove = function(player) {
/*    var data = {
        pid: player.id,
        direction: player.direction,
        speed: player.speed,
        ping: player.ping,
        isMove: true,
        old_position: {
            x: player.oldPosition.x,
            y: player.oldPosition.y,
            z: player.oldPosition.z
        },
        cur_position: {
            x: player.position.x,
            y: player.position.y + 0.5,
            z: player.position.z
        },
        point_position: {
            x: player.positionMovePoint.x,
            y: player.positionMovePoint.y,
            z: player.positionMovePoint.z
        }
    };*/
    var data = {
        pid: player.id,
        rotation_speed: player.speedRotation,
        move_speed: player.speedMove,
        move_position: player.positionMovePoint,
        timer: {
            rotation_time: player.rotationTime,
            move_time: player.moveTime
        }
    };

    var packet = new Packet(ManagerCommands.commands.PLAYER_ACTION.MOVE, data);
    return packet;
};