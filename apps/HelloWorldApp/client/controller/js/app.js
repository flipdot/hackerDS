hackerDS.register();

function sendToDisplay(){
  hackerDS.app.display.send(document.getElementById("msg").value);
}