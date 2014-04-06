function CoreServer(socketServer, appsManager){
  var self = this;
  
  function sendToAppClient(appname, typ, name, data){
    var room = appname+"."+typ;
    var msg = {
      name: name,
      data: data
    }
    socketServer.sockets.in(room).emit('message', msg);
  }
  
  appsManager.setupClientPipeline(function (req) {
    var appname = req.appname;
    var typ = req.typ;
    
    sendToAppClient(appname, typ, req.name, req.data);
  });
  
  socketServer.on('connection', function (socket) {
    socket.on('registerClient', function (data) {
      var client = data.client;
      var room = client.name+"."+client.typ;
      socket.join(room);
    });
    
    socket.on('clientMessage', function (data) {
      if(data.typ === "server"){
        var app = appsManager.getApp(data.appname);
        if(app){
          var method = app.methods[data.msg.name];
          if(method) method(data.msg.data, function (name, data) {
            socket.emit(name, data);
          });
        }
        return;
      }
      
      sendToAppClient(data.appname, data.typ, data.msg.name, data.msg.data);
    });
  });
}

module.exports = {
  create: function (engineServer, appsManager) {
    return new CoreServer(engineServer, appsManager);
  }
};