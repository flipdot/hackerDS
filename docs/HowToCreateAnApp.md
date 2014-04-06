How to create an app
====================

To create an app for the hackerDS system we recommend to copy the `aps/HelloWorldApp`-folder.
The `HelloWorldApp` is a simple demo app showing most of the features that hackerDS provides.

App folder structure
--------------------
Every app must have the following structure to be loaded into the hackerDS system:

    |-YourAppName
      |-client
        |-controller
          |- ...your files...
        |-display
          |- ...your files...
      |-server
        |- server.js
      |- icon.png

**`/icon.png`**  
The icon for the app at size 150px x 150px in PNG format

**`/client`**  
The content of this folder is published at `/apps/{YourAppName}`, for example the content of a folder `shared` is available at `/apps/{YourAppName}/shared`.

**`/client/controller`**  
Contains the public files for the touchscreen controller

**`/client/display`**  
Contains the public files for the large display

**`/server/server.js`**  
This file contains the server code for your app. This file has to export a constructor, an instance will be created by the hackerDS system.
If you implement an `init` function it will be called after the app-server has been loaded.
If you implement an `methods` object, you can call its functions from the hackerDS client library.

**Example file:**

    module.exports = function Server(hackerDS) {
      var mySelf = this;

      mySelf.init = function(){
        console.log("init my module");
      };

      mySelf.methods = {
        "serverMsg": function (msg) {
          // simply log the message to the console
          console.log(msg);
        }
      };
    };

hackerDS client library
-----------------------
To use the hackerDS client library add the following script tag to you html page:

    <script type="text/javascript" src="/hackerDS/js"></script>

In you javascript code you can access all the functionality from the `hackerDS` object.
It has the following members:

- `hackerDS.on(eventName:string, handler:function`  
  Subscribes to the event `eventName` and runs `handler` if the event is triggered by either the controller, the display or the server.

- `hackerDS.{target}.send(eventName:string, data:string)`  
  Triggers the event `eventName` and sends the string `data` to the subscribers (if you want to transfer object use `JSON.stringify` and `JSON.parse`)  
  `{target}` can either be `controller`,`display` or `server` whoever you want to send the message to.
  
  **Examples:**
  
      hackerDS.display.send('fancyEvent123', 'Hello display!')
      hackerDS.server.send('sendSMS', '{number:01234567,text:"Hello World"}')

hackerDS server library
-----------------------

As you have seen in the server.js example file, your server gets an `hackerDS` object passed in the constructor which exposes a simmlar api:

- `hackerDS.{target}.send(eventName:string. data:string)`  
  Triggers the event `eventName` and sends the string `data` to the subscribers (if you want to transfer object use `JSON.stringify` and `JSON.parse`)  
  `{target}` can either be `controller`,`display` or `server` whoever you want to send the message to.