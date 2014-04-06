function sendToDisplay(){
  var text = document.getElementById("msg").value;
  hackerDS.display.send("msg", text);
}

function sendToServer(){
  var text = document.getElementById("msg").value;
  hackerDS.send("serverMsg", text);
}