var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var socketIo = require('socket.io');

var appsManager = require(__dirname+"/appManager.js").create(__dirname+"/../apps");
var coreServer = require(__dirname+"/coreServer.js");

appsManager.loadApps().then(function () {

  function redirectToApp(path){
    app.get("/"+path, function (req, res) {
      res.redirect("/apps/HackerDSCore/"+path);
    });
  }

  app.get("/hackerDS/js", function (req, res) {
    res.sendfile("hackerDS.js", {root: __dirname+"/../apps/HackerDSCore/client/hackerDS/js"});
  });
  
  redirectToApp("controller");
  redirectToApp("display");
  
  // set up app routes
  appsManager.apps.map(function (dsApp) {
    app.get("/apps/"+dsApp.name+"/icon", function (req, res) {
      res.sendfile("icon.png", {root: __dirname+"/../apps/"+dsApp.name});
    });
    
    app.use(
      "/apps/"+dsApp.name,
      express.static(__dirname+"/../apps/"+dsApp.name+"/client")
    );
  });
  
  app.get("/apps", function(req, res){
    var apps = appsManager.apps
      .filter(function(app){return app.name !== "HackerDSCore";})
      .map(function (app) { return {name: app.name}; });
    res.send(apps);
  });

  httpServer.listen(3000);
  var socketServer = socketIo.listen(httpServer);
  socketServer.set('log level', 0);
  
  coreServer.create(socketServer, appsManager);
});
