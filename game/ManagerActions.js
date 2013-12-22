module.exports = {
  handle: function(command, data) {
    switch(command) {
      case 12:
        console.log(data);
      break;
    }
  }
};