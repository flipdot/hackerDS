module.exports = function Server(app) {
  var mySelf = this;
  
  mySelf.init = function(){
    console.log("init hello world module");
    
    var i = 1;
    setInterval(function() {
      app.display.send("demoToDisplayMessage", "hello from the server! "+i);
      i++;
    }, 1000);
  };
  
  mySelf.methods = {
    "serverMsg": function (msg) {
      console.log(msg);
    }
  };
};