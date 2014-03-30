module.exports =function(req, res, modulesManager){
  var desc = modulesManager.modules.map(function(mod){return mod.getDescription()});
  res.send(desc);
};