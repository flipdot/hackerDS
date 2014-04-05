var fsLib = require(__dirname+"/lib/fs.lib.js");
var path = require("path");
var Q = require("q");

function AppManager(appsFolder){
  var self = this;
  
  self.apps = [];
  
  self.loadApps = function () {
    return fsLib.readDirs(appsFolder).then(function(dirs){
      dirs.map(function(dir){
        self.apps.push(new App(dir));
      });
    });
  }
};

function App(folder){
  var self = this;

  self.folder = folder;
  self.name = path.basename(self.folder);
  
  var serverJs = path.join(self.folder, "/server/server.js");
  self.server = require(serverJs);
  if(self.server.init) self.server.init();
}

module.exports = {
  create: function(appsFolder){
    return new AppManager(appsFolder);
  }
};