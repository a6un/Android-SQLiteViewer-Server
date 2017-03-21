var currentDatabase = null;
var currentTable = null;


$("body").on("click", ".database-list li i", function(e) {



	var data = {
		database : $(this).attr('dbname')
	};

	socket.emit("get:tables",data);

	 currentDatabase = $(this).attr('dbname');
    
});


$("body").on("click", ".table-view", function(e) {



	var data = {
		table : $(this).attr('tablename'),
		database : $(this).attr('dbname')

	};

	socket.emit("get:table:data",data);

	 currentTable = $(this).attr('tablename');
    
});

var socket = io('http://localhost:8000');

socket.on('connect', function(){

	console.log("connected to server");

	socket.emit("get:databases");

});


socket.on('service:send:databases', function(data){

	data = JSON.parse(data);

	$HTML = "";

	$.each(data,function(i, database){
		

		$HTML += "<li id='database_" + database.name +"'><i dbname='" + database.name +"'class=\"fa fa-camera-retro\"></i>"+ database.name + "<ul class=\"database-table-list\"></ul></li>" ;

	});

	$(".database-list").append($HTML);


});


socket.on('service:send:tables', function(data){

	data = JSON.parse(data);

	$HTML = "";            
       

	$.each(data,function(i,table){

	$HTML += "<li dbname='"+ currentDatabase+"' tablename='"+ table+"' class=\"table-view\">"+ table +"</li>";

	});

	$("#database_" + currentDatabase + " ul").html($HTML);
	$("#database_" + currentDatabase + " ul").show();

	console.log($HTML);

});

socket.on('service:send:data', function(data){

     data = JSON.parse(data);

     console.log(data);

     // <table>
     //		<tr><th></th></tr>
     //		<tr><td><td></tr>
     // </table>

     $HTML = "<table><tr>";

     $.each(data.fields,function(i,field_name){

     	$HTML += "<th>" + field_name + "</th>";

     });

     $HTML += "</tr>";

     $.each(data.data,function(i,field){

     	$HTML += "<tr>";
     	

     	$.each(field,function(j,field_data){
     		
     		$HTML += "<th>" + field_data + "</th>";

     	});

     	$HTML += "</tr>";
     	

     });

	$HTML += "</table>"

	$("#table-data-view").html($HTML);





});