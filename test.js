var moment = require('moment');

// var date = moment(0).startOf('second');
// date.milliseconds(0);
// [year, month, day, hour, minute, second, millisecond]
/*var date = moment(0);
date.year(3175);
date.month(1);
date.day(1);

setInterval(function() {
    date.add('second', 60);
    // console.log(date.seconds(), date.minute(), date.hour());
    console.log(date.format("dddd, MMMM Do YYYY, H:mm:ss a"));
}, 1);//1000 / 8);*/
var Player = require('./classes/PlayerClass');
var Vector = require('vector').Vector;
var e = new Player();
e.position = new Vector(90, 0, 50);
var Timer = require('./classes/TimerClass');
Timer.runTimer(function(tick, date) {
    if (tick % 20 === 0) {
        console.log('send ping');
    }

    if (tick % 5 === 0) {
        console.log('update player');
        e.setPositionMovePoint(100, 6, 35);
        console.log(e);
    }

    if (tick % 80 === 0) {
        console.log('send state');
    }
    // console.log(Timer.getCurrentDate().format('YYYY MMMM DD H:m:s'));
});
