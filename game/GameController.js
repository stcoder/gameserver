var config, log, util, net, GameController;

config = require('/../library/config');
log = require('/../library/logger')(module);
util = require('util');
net = require('net');

GameController = function() {
    this.connections = [];
}