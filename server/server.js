var express = require('express');
var app = express();

app.use("/controller", express.static(__dirname+"/../controller"));
app.use("/display", express.static(__dirname+"/../display"));
app.use("/content", express.static(__dirname+"/content"));

app.listen(3000);