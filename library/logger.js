var winston, config, path, transports, filename, level;

winston = require('winston');
config = require('./config');
path = require('path');

level = 'debug';

transports = [
  new winston.transports.Console({
    colorize: true,
    label: filename,
    level: level
  })
];

module.exports = function(module) {
  filename = module.filename.split(path.sep).slice(-2).join('/');

  transports = [
    new winston.transports.Console({
      colorize: true,
      label: filename,
      level: level
    }),
    new winston.transports.File({
      level: level,
      maxsize: 131072,
      filename: path.normalize(path.join(config.get('root_dir'), config.get('server:log')))
    })
  ];

  return new winston.Logger({
    transports: transports
  });
};