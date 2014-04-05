function initMessagePipeline(){
  var socket = new eio.Socket();
  socket.on('open', function () {
    socket.send("Hello from client!");
  });
  
  window.hackerDS = {};
  window.hackerDS.core = 1;
  window.hackerDS.apps = 1;
  window.hackerDS.app = 1;
}

initMessagePipeline();