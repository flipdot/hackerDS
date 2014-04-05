var fsLib = require(__dirname+"/lib/fs.lib.js");
var path = require("path");
var Q = require("q");

function AppManager(appsFolder){
  var mySelf = this;
  
  mySelf.apps = [];
  
  mySelf.loadApps = function () {
    return fsLib.readDirs(appsFolder).then(function(dirs){
      dirs.map(function(dir){
        mySelf.apps.push(new App(dir));
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

function App(folder){
  var self = this;

  self.folder = folder;
  self.name = path.basename(self.folder);
  
  var serverJs = path.join(self.folder, "/server/server.js");
  try {
    var serverClass = require(serverJs);
    self.server = new serverClass();
    
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