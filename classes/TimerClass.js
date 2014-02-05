var BaseClass = require('basejs');
var Moment = require('moment');
var Config = require('./../library/config');
var Log = require('./../library/logger')(module);

var TimerClass = BaseClass.extend({
    constructor: function() {
        this.setStartedDate();
        this.currentDate = this.getStartedDate();
        this.lastDate = '';

        this.timer = null;
        this.tick = 1;
        this.updateInSecond = Config.get('game:update_in_second');
    },
    setStartedDate: function() {
        // 27 октбря 3175
        var date = Moment(0);
        date.set('year', 3175);
        date.set('month', 9);
        date.set('day', 27);
        date.set('hour', 0);
        date.set('minute', 0);
        date.set('second', 0);
        this.startedDate = date;
    },
    getStartedDate: function() {
        return this.startedDate;
    },
    getCurrentDate: function() {
        return this.currentDate;
    },
    runTimer: function(GameUpdate) {
        var _this = this;

        this.timer = setInterval(function() {

            GameUpdate(_this.tick, _this.getCurrentDate());
            _this.tick++;

            if (_this.tick % _this.updateInSecond === 0) {
                _this.currentDate.add('second', 1);
            }
        }, 1000 / _this.updateInSecond);
    }
});

module.exports = new TimerClass();