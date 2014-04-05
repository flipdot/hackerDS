var Q = require('q');

function CoreServer(engineServer){
  var self = this;
  
  engineServer.on('connection', function (socket) {
    socket.on('message', function (msg) {
      onMessage(socket, JSON.parse(msg));
    });
  });
  
  var apps = [];
  
  function getAppPage(appname, typ){
      if(!apps[appname]) apps[appname] = {};
      var app = apps[appname];

      if(!app[typ]) app[typ] = {};
      var appPage = app[typ];
      
      if(!appPage.clients) appPage.clients = [];
      
      return appPage;
  }
  
  var handlers = {
    registerClient: function (socket, data) {
      var client = data.client;
      
      // client.name example: "controller" or "display"
      var appPage = getAppPage(client.name, client.typ);
      var clients = appPage.clients;
      
      clients.push(socket);
    },
    clientMessage: function (socket, data) {
      var appPage = getAppPage(data.appname, data.typ);
      appPage.clients.map(function (socket) {
        socket.send(data.data)
      });
    }
  };
  
  function onMessage(socket, msg){
    try {
      var method = msg.method;
      if(method){
        var handler = handlers[method];
        if(handler) handler(socket, msg.data);
      }
    } catch(err) {
      console.log("coreServer.onMessage error: "+err);
    }
  }
}

module.exports = {
  create: function (engineServer) {
    return new CoreServer(engineServer);
  }
};