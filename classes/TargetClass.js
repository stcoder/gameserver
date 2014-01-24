var BaseClass = require('basejs');
var _ = require('underscore');
var TargetsType = require('./../game/TargetsType');

var TargetClass = BaseClass.extend({
    constructor: function(object) {
        this.object = object;
        this.type = (object) ? object.type : TargetsType.unknown;
    }
});

module.exports = TargetClass;