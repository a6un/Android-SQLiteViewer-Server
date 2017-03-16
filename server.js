var express = require("express");
var app = express()
var server = require('http').createServer(app);
const socketio = require('socket.io')(server);
const fs = require("fs");

var PORT = 8000;

var database;

fs.readFile('mock.json', (err, data) => {

  if (err) throw err;

  var data = data.toString();

  var database = JSON.parse(data);

  console.log('mock database loaded');

});

app.use("/",express.static('public'))


socketio.on("connection",function (socket) {
    
    
	
	console.log("Client connected !");
	

    //Emit databases names
    socket.on("get:database",function(data){
    	console.log("listing databases");
		socket.emit("get:database",["db1","db2"]);
	});

    //Emit table names from database given
	socket.on("get:table",function(data){
		//socket.emit("get:table",);
	});


	//Emit fields and data based on the table names from database given
	socket.on("get:table:data",function(data){
		//socket.emit("get:table:data",);
	});




});

server.listen(PORT, function() {
  console.log('Node app is running on port', PORT);
});