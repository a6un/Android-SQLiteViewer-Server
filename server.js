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
    socket.on("get:databases",function(data){
    	console.log("[Interface] : list databases");
    	// ask service to emit then database names
    	socket.broadcast.emit("get:databases");
		
	});

    //Emit table names from database given
	socket.on("get:tables",function(data){
		console.log("[Interface] : list tables");
		// ask service to emit then table names
		socket.broadcast.emit("get:tables",data);
	});


	//Emit fields and data based on the table names from database given
	socket.on("get:table:data",function(data){
		console.log("[Interface] : list fields and data");
		// ask service to emit then data inside the tables
		socket.broadcast.emit("get:table:data",data);
	});


   socket.on("interface:update",function(data){   	
   		console.log("[Interface] : Update request received");
   });  


 	//Service Events 

 	socket.on("service:send:databases",function(data){

 		console.log("[Service] : Sent Databases"); 		
 		
		// Emit/Send the databases to the Interface
		socket.broadcast.emit("service:send:databases",data);

 	});

 	socket.on("service:send:tables",function(data){

 		console.log("[Service] : Sent Tables");

 		// Emit/Send the tables to the Interface
 		socket.broadcast.emit("service:send:tables",data);		

 	});

 	socket.on("service:send:data",function(data){

 		console.log("[Service] : Sent fields and Data");		

		// Emit/Send the fields and data to the Interface
		socket.broadcast.emit("service:send:data",data);

 	});



 	 socket.on("service:update",function(data){   	
   		console.log("[Service] :Update request received");
   });  


});

server.listen(PORT, function() {
  console.log('Node app is running on port', PORT);
});