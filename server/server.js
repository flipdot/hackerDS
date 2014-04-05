var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var engine = require('engine.io');

var appsManager = require(__dirname+"/appManager.js").create(__dirname+"/../apps");
var coreServer = require(__dirname+"/coreServer.js");

appsManager.loadApps().then(function () {

  app.use("/controller", express.static(__dirname+"/../client/dest/controller"));
  app.use("/display", express.static(__dirname+"/../client/dest/display"));
  app.use("/shared", express.static(__dirname+"/../client/dest/shared"));
  app.use("/hackerDS", express.static(__dirname+"/../client/dest/hackerDS"));
  
  // set up app routes
  appsManager.apps.map(function (dsApp) {
    app.get("/apps/"+dsApp.name+"/icon", function (req, res) {
      res.sendfile("icon.png", {root: __dirname+"/../apps/"+dsApp.name});
    });
    
    app.use(
      "/apps/"+app.name,
      express.static(__dirname+"/../apps/"+app.name
    ));
  });
  
  app.get("/apps", function(req, res){
    var apps = appsManager.apps
      .map(function (app) { return {name: app.name}; });
    res.send(apps);
  });

  httpServer.listen(3000);
  var engineServer = engine.attach(httpServer);
  coreServer.create(engineServer);
});
