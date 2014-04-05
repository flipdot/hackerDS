var Q = require('q');

function CoreServer(socketServer){
  var self = this;
  
  socketServer.on('connection', function (socket) {
    socket.on('registerClient', function (data) {
      var client = data.client;
      var room = client.name+"."+client.typ;
      socket.join(room);
    });
    
    socket.on('clientMessage', function (data) {
      var room = data.appname+"."+data.typ;
      socket.broadcast.to(room).emit("message", data.data);
    });
  });
}

module.exports = {
  create: function (engineServer) {
    return new CoreServer(engineServer);
  }
};