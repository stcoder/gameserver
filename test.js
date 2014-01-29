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

var Timer = require('./classes/TimerClass');
Timer.runTimer(function() {
    var tick = 0;
    var interval = setInterval(function() {
        console.log(tick);
        tick++;
    }, 1000 / 8);
});