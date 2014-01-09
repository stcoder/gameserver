var net, bson, socket;

net = require('net');
bson = require('bson').BSONPure.BSON;

socket = new net.Socket();

socket.connect(9999, 'localhost');

socket.write(bson.serialize({
  cmd: 2.1,
  data: [35, 35, 35]
}));

socket.on('data', function(buffer) {
    console.log(bson.deserialize(buffer));
});