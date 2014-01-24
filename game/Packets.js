var Packet = require('./../classes/PacketClass');
var ManagerCommands = require('./ManagerCommands');

// Packets

/**
 * Подключение игрока инициатора
 * 
 * Пакет отправляется игроку который совершил подключение
 */
exports.playerConnected = function(player) {
    var data = {
        pid: player.id
    };

    var packet = new Packet(ManagerCommands.commands.PLAYER.CONNECT, data);
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

    var packet = new Packet(ManagerCommands.commands.PLAYER.CONNECT, data);
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