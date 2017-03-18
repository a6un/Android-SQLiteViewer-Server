var express = require("express");
var app = express()
var server = require('http').createServer(app);
const socketio = require('socket.io')(server);
const fs = require("fs");

/*
 * interface - is the Web Interface / GUI Dashboard - Socket.IO Client JavaScript
 * service - is the service running on Android 		- Socket.IO Client Android (Java)
 * server - is this Node.JS Program 				- Socket.IO Node.JS Server
 *
 */

var PORT = 8000;

var database;

fs.readFile('mock.json', (err, data) => {

  if (err) throw err;

  var data = data.toString();

  var database = JSON.parse(data);

  console.log('mock database loaded');

});

app.use("/",express.static('public'));


socketio.on("connection",function (socket) {
    
    
	
	console.log("Client connected !");
	

    //Emit databases names
    socket.on("get:database",function(data){
    	console.log("[Interface] : list databases");
    	// ask service to emit then database names


		
	});

    //Emit table names from database given
	socket.on("get:table",function(data){
		console.log("[Interface] : list tables");
		//socket.emit("get:table",);
	});


	//Emit fields and data based on the table names from database given
	socket.on("get:table:data",function(data){
		console.log("[Interface] : list fields and data");
		//socket.emit("get:table:data",);
	});


   socket.on("interface:update",function(data){   	
   		console.log("[Interface] : Update request received");
   });  


 	//Service Events 

 	socket.on("service:send:databases",function(data){
 		console.log("[Service] : Sent Databases");

		// Emit/Send the databases to the Interface

 	});

 	socket.on("service:send:Tables",function(data){
 		console.log("[Service] : Sent Tables");

		// Emit/Send the tables to the Interface

 	});

 	socket.on("service:send:fields and Data",function(data){
 		console.log("[Service] : Sent fields and Data");

		// Emit/Send the fields and data to the Interface

 	});



 	 socket.on("service:update",function(data){   	
   		console.log("[Service] :Update request received");
   });  


});

server.listen(PORT, function() {
  console.log('Node app is running on port', PORT);
});