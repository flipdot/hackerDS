function CoreServer(socketServer, appsManager){
  var self = this;
  
  socketServer.on('connection', function (socket) {
    socket.on('registerClient', function (data) {
      var client = data.client;
      var room = client.name+"."+client.typ;
      socket.join(room);
    });
    
    socket.on('clientMessage', function (data) {
      if(data.typ === "server"){
        var app = appsManager.getApp(data.appname);
        if(app && app.server && app.server.methods){
          var method = app.server.methods[data.msg.name];
          if(method) method(data.msg.data, function (name, data) {
            socket.emit(name, data);
          });
        }
        return;
      }
      
      var room = data.appname+"."+data.typ;
      socket.broadcast.to(room).emit("message", data.msg);
    });
  });
}

module.exports = {
  create: function (engineServer, appsManager) {
    return new CoreServer(engineServer, appsManager);
  }
};