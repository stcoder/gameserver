var net, bson, socket;

net = require('net');
bson = require('bson').BSONPure.BSON;

socket = new net.Socket();

socket.connect(9999, 'localhost');

socket.write(bson.serialize({
  command: 12,
  data: {
    x: 0,
    y: 0,
    z: 10
  }
}));