// var net, bson, socket;

// net = require('net');
// bson = require('bson').BSONPure.BSON;

// socket = new net.Socket();

// socket.connect(9999, 'localhost');

// socket.write(bson.serialize({
// 	command: 1.6, data: {}
// }));

// socket.on('data', function(buffer) {
//     var b = bson.deserialize(buffer);

//     switch(b.cmd) {
//     	case 1.6:
// 			socket.write(bson.serialize({
// 			  cmd: 2.1,
// 			  data: [35, 35, 35]
// 			}));
//     	break;
//     }

//     console.log(b);
// });
var latencyEmulate = 1000;
var net = require('net');
var bson = require('bson').pure().BSON;

var client = net.connect({port: 9999}, function() {
    console.log('connected');
});

client.on('data', function(buffer) {
    var packet = bson.deserialize(buffer);
    if (packet.command == 1.6) {
        var sendPacket = {
            command: 1.6,
            data: {}
        };
        var buffer = bson.serialize(sendPacket);
        setTimeout(function() {
            client.write(buffer);            
        }, latencyEmulate);
    }
    console.log(packet);
});
