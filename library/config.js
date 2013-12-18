var nconf, path;

nconf = require('nconf');
path = require('path');

nconf
  .argv()
  .env()
  .file({file: path.join(__dirname, '/../config.json')});

nconf.set('root_dir', path.normalize(__dirname + '/../'));
module.exports = nconf;