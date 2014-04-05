var Q = require('q');

function CoreServer(engineServer){
  var self = this;
  
  engineServer.on('connection', function (socket) {
    socket.on('message', function (msg) {
      onMessage(socket, msg);
    });
  });
  
  function onMessage(socket, msg){
    console.log(msg);
  }
}

module.exports = {
  create: function (engineServer) {
    return new CoreServer(engineServer);
  }
};