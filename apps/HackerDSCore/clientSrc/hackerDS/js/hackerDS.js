(function(){
  function HackerDS(){
    var self = this;
    
    var socket = new io.connect();
    
    var onMessageCallback;
    socket.on('message', function (msg) {
      if(onMessageCallback) onMessageCallback(msg);
    });

    function sendToClient(appname, typ, data){
      var data ={
        appname: appname,
        typ: typ,
        data: data
      };
      socket.emit("clientMessage", data);
    }
    
    self.register = function () {
      var client = {};
      var pathname = window.location.pathname;
      
      var appNameResult = pathname.match(/\/apps\/(\w{1,})\/(\w{1,})/);
      if(appNameResult){
        var appname = appNameResult[1];

        self.app = {
          controller: {
            send: function(data) { 
              sendToClient(appname, "controller", data);
            } 
          },
          display: { 
            send: function (data) { 
              sendToClient(appname, "display", data); 
            } 
          },
          send: function (data) { 
            sendToClient(appname, "server", data);
          }
        };
       
        var appControllerOrDisplay = appNameResult[2];
        client.typ = appControllerOrDisplay;
        client.name = appname;
      }
      
      socket.emit("registerClient", { client: client });
    };
    
    self.onMessage = function (onMsgCallback) {
      onMessageCallback = onMsgCallback;
    };
  }
  
  window.hackerDS = new HackerDS();
})();