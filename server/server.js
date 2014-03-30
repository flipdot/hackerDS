var express = require('express');
var app = express();

var serverCore = require(__dirname+"/core/core.js");

app.use("/controller", express.static(__dirname+"/../controller"));
app.use("/display", express.static(__dirname+"/../display"));
app.use("/content", express.static(__dirname+"/content"));

serverCore(express, app, function(){
  app.listen(3000);
});