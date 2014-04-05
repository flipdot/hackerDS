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

    function sendToClient(appname, typ, name, data){
      var req = {
        appname: appname,
        typ: typ,
        msg: {
          name: name,
          data: data
        }
      };
      socket.emit("clientMessage", req);
    }
    
    self.register = function () {
      var client = {};
      var pathname = window.location.pathname;
      
      var appNameResult = pathname.match(/\/apps\/(\w{1,})\/(\w{1,})/);
      if(appNameResult){
        var appname = appNameResult[1];

        self.app = {
          controller: {
            send: function(name, data) { 
              sendToClient(appname, "controller", name, data);
            } 
          },
          display: { 
            send: function (name, data) { 
              sendToClient(appname, "display", name, data); 
            } 
          },
          send: function (name, data) { 
            sendToClient(appname, "server", name, data);
          }
        };
       
        var appControllerOrDisplay = appNameResult[2];
        client.typ = appControllerOrDisplay;
        client.name = appname;
      }
      
      socket.emit("registerClient", { client: client });
    };
    
    self.on = function (name, callback) {
      messageCallbacks[name] = callback;
    };
  }
  
  window.hackerDS = new HackerDS();
})();