var coreApps = require(__dirname+"/apps.js");
var ModulesManager = require(__dirname+"/ModuleManager.js");

module.exports = function(express, app, callback){
  ModulesManager(function(modManager){
    var modulesManager = modManager;
    
    app.get("/core/apps", function(req, res){
      return coreApps(req, res, modulesManager);
    });
    
    modulesManager.modules.map(function(module){
      var modName = module.getDescription().name;
      app.use("/modules/"+modName, express.static(__dirname+"/../modules/"+modName));
    });
    
    callback(null);
  });
};