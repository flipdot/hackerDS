var Q = require("q");
var fs = require("fs");
var path = require("path");

module.exports = {
  readDirs: function(dirPath){
    return Q.nfcall(fs.readdir, dirPath).then(function(folders){
      var statPromises = folders.map(function(folder){
        var folderPath = path.join(dirPath, folder);
        
        var deferred = Q.defer();
        fs.stat(folderPath, function(err, stat){
          if(err) deferred.reject(new Error(err));
          deferred.resolve({
            folder: folderPath,
            stat: stat
          });
        });
        return deferred.promise;
      });
      
      return Q.all(statPromises).then(function(stats){
        var dirs = stats
        .filter(function(stat){return stat.stat.isDirectory()})
        .map(function(stat){return stat.folder});
        
        return dirs; 
      });
    });
  }
};