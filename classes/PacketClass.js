var BaseClass = require('basejs');
var _ = require('underscore');
var BSON = require('bson').native().BSON,
    Long = require('bson').native().Long,
    ObjectID = require('bson').native().ObjectID,
    Binary = require('bson').native().Binary,
    Code = require('bson').native().Code,  
    DBRef = require('bson').native().DBRef,  
    Symbol = require('bson').native().Symbol,  
    Double = require('bson').native().Double,  
    MaxKey = require('bson').native().MaxKey,  
    MinKey = require('bson').native().MinKey,  
    Timestamp = require('bson').native().Timestamp;

var bson = new BSON([Long, ObjectID, Binary, Code, DBRef, Symbol, Double, Timestamp, MaxKey, MinKey]);

var PacketClass = BaseClass.extend({
    constructor: function(command, data) {
        this.command = command;
        this.data = data;
        this.size = bson.calculateObjectSize(this.data);
    },
    getBuffer: function() {
        return bson.serialize({command: this.command, data: this.data}, null, true);
    }
}, {
    createFromBuffer: function(bufferSource) {
        var buffer = bson.deserialize(bufferSource);
        var command = buffer.command;
        var data = buffer.data;

        var packet = new PacketClass(command, data);
        return packet;
    }
});

module.exports = PacketClass;