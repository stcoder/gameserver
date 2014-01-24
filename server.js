var config, logger, GameController;

config = require('./library/config');
logger = require('./library/logger')(module);

// GameController = require('./game/GameController');
// GameController.init();
// GameController.run();

var game = require('./game/GameController');
game.run();

/*var Packet = require('./classes/PacketClass');

var Ping = new Packet(1.1, {});
var buffer = Ping.getBuffer();

console.log(Ping);
console.log(buffer);
console.log(Packet.createFromBuffer(buffer));

var Packets = require('./game/Packets');

console.log(Packets.playerInitiatorDisconnect({id: 123}));*/