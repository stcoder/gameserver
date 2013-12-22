var config, logger, GameController;

config = require('./library/config');
logger = require('./library/logger')(module);

// logger.info('Server script is running');

GameController = require('./game/GameController');
GameController.init();
GameController.run();

/*var bsonF = require('bson').BSONPure.BSON;
var bson = bsonF;

var data = {
  CMD: -1,
  TICK: 234,
  X: 2.2313123,
  Y: 3.3458394,
  Z: 2.1323123
};
var d = bson.serialize(data);

console.log(bson.calculateObjectSize(data), bson.deserialize(d));*/