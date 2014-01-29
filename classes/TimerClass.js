var BaseClass = require('basejs');
var Moment = require('moment');
var Config = require('./../library/config');
var Log = require('./../library/logger')(module);

var TimerClass = BaseClass.extend({
    constructor: function() {
        this.startedDate = Moment(0);
        this.currentDate = Moment(0);

        this.timer = null;
        this.tick = 0;
    },
    getStartedDate: function() {
        // 27 октбря 3175
    },
    getCurrentDate: function() {

    },
    runTimer: function(GameUpdate) {
        var _this = this;

        this.timer = setInterval(function() {

            GameUpdate();

            console.log(_this.currentDate.format("dddd, MMMM Do YYYY, H:mm:ss a"));
            _this.currentDate.add('second', 1);
        }, 1000);
    }
});

module.exports = new TimerClass();