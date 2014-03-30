var fsLib = require(__dirname+"/../lib/fs.lib.js");
var path = require("path");

module.exports = function(callback){
  var modManager = {};
  modManager.modules = [];
  var moduleDir = __dirname+"/../modules";
  fsLib.readDirs(moduleDir).then(function(dirs){
    dirs.map(function(dir){
      modManager.modules.push(new Module(dir));
    });
    
    callback(modManager);
  });
};

function Module(moduleFolder){
  var self = this;

  self.folder = moduleFolder;
  
  var serverJs = path.join(self.folder, "server.js");
  self.server = require(serverJs);
  
  self.getDescription = function(){
    return {
      name: path.basename(self.folder)
    };
  };
}