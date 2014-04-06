(function(){
  function HackerDS(){
    var self = this;
    
    var socket = new io.connect();
    
    var messageCallbacks = {};
    socket.on('message', function (msg) {
      var handler = messageCallbacks[msg.name];
      if(handler){
        handler(msg.data);
      }
    });
    
    socket.on('reconnect', function () {
      registerClient();
    });

    // typ is either "controller" or "display"
    function sendMessageToApp(appname, typ, messageName, messageData){
      var req = {
        appname: appname,
        typ: typ,
        msg: {
          name: messageName,
          data: messageData
        }
      };
      socket.emit("clientMessage", req);
    }
    
    var client = {};
    var pathname = window.location.pathname;
    var appNameResult = pathname.match(/\/apps\/(\w{1,})\/(\w{1,})/);
    if(appNameResult){
      client.name = appNameResult[1];
      client.typ = appNameResult[2];

      self.controller = { send: function(name, data) { sendMessageToApp(client.name, "controller", name, data); } };
      self.display = { send: function (name, data) { sendMessageToApp(client.name, "display", name, data);} };
      self.send = function (name, data) { sendMessageToApp(client.name, "server", name, data); };
    }
    
    function registerClient(){
      socket.emit("registerClient", { client: client });
    }
    registerClient();
    
    self.on = function (name, callback) {
      messageCallbacks[name] = callback;
    };
  }
  
  window.hackerDS = new HackerDS();
})();