var fsLib = require(__dirname+"/lib/fs.lib.js");
var path = require("path");
var Q = require("q");

function AppManager(appsFolder){
  var mySelf = this;
  
  mySelf.apps = [];
  
  var sendToClient;
  mySelf.setupClientPipeline = function (sendToClientFunction) {
    sendToClient = sendToClientFunction;
  };
  
  function fromAppServerToClient(req){
    sendToClient(req);
  }
  
  mySelf.loadApps = function () {
    return fsLib.readDirs(appsFolder).then(function(dirs){
      dirs.map(function(dir){
        var app = new App(dir, fromAppServerToClient);
        mySelf.apps.push(app);
      });
    });
  }
  
  mySelf.getApp = function(name){
    for(var i in mySelf.apps){
      var app = mySelf.apps[i];
      if(app.name === name){
        return app;
      }
    }
  };
};

function App(folder, serverToClient){
  var self = this;

  self.folder = folder;
  self.name = path.basename(self.folder);
  
  function sendServerToClient(typ, name, data) {
    serverToClient({
      appname: self.name,
      typ: typ,
      name: name,
      data: data
    });
  }
  
  self.display = { send: function(name, data) { sendServerToClient("display", name, data) } };
  self.controller = { send: function(name, data) { sendServerToClient("controller", name, data) } };
  
  var serverJs = path.join(self.folder, "/server/server.js");
  try {
    var serverClass = require(serverJs);
    self.server = new serverClass(self);
    
    if(self.server.init) self.server.init();
  } catch(err){
    console.log(err);
  }
}

module.exports = {
  create: function(appsFolder){
    return new AppManager(appsFolder);
  }
};