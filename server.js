var config, logger, GameController;

config = require('./library/config');
logger = require('./library/logger')(module);

GameController = require('./game/GameController');
GameController.init();
GameController.run();