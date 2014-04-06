hackerDS.on("msg", function (msg) {
  alert(msg);
})

hackerDS.on('demoToDisplayMessage', function (msg) {
  var output = document.getElementById('output');
  output.innerHTML += "<br>"+msg;
})