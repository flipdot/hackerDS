module.exports = function Server(controller, display) {
  var mySelf = this;
  
  mySelf.init = function(){
    console.log("init hello world module");
  };
  
  mySelf.methods = {
    "serverMsg": function (msg) {
      console.log(msg);
      //display.send("demoToDisplayMessage", "hello from the server!");
    }
  };
};