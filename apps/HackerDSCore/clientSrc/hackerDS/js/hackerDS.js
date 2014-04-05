(function(){
  function HackerDS(){
    var self = this;
    
    var notifyReady;
    var socket = new eio.Socket();
    socket.on('open', function () {
      socket.on('message', onMessage);
      
      if(notifyReady) notifyReady();
    });
    
    var onMessageCallback;
    function onMessage(msg){
      if(onMessageCallback) onMessageCallback(msg);
    }
    
    function sendToClient(appname, typ, data){
      var req = {
        method: "clientMessage",
        data: {
          appname: appname,
          typ: typ,
          data: data
        }
      };
      socket.send(JSON.stringify(req));
    }
    
    self.register = function (readyCallback) {
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
      
      socket.send(JSON.stringify({
        method: "registerClient",
        data: {
          client: client
        }
      }));

      notifyReady = readyCallback;
    };
    
    self.onMessage = function (onMsgCallback) {
      onMessageCallback = onMsgCallback;
    };
  }
  
  window.hackerDS = new HackerDS();
})();