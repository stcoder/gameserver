var config, logger, GameController;

config = require('./library/config');
logger = require('./library/logger')(module);

// logger.info('Server script is running');

GameController = require('./game/GameController');
GameController.init();
GameController.run();