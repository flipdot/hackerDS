function sendToDisplay(){
  var text = document.getElementById("msg").value;
  hackerDS.app.display.send("msg", text);
}

function sendToServer(){
  var text = document.getElementById("msg").value;
  hackerDS.app.send("serverMsg", text);
}