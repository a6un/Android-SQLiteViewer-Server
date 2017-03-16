$("body").on("click", ".database-list li i", function(e) {

	$(this).next().toggle();

	$(this).children().toggle();
    
});



var socket = io('http://localhost:8000');

socket.on('connect', function(){

	console.log("connected to server");

});


socket.on('get:database', function(data){

	console.log(data);


	});