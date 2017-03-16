$("body").on("click", ".database-list li i", function(e) {

	$(this).next().toggle();

	$(this).children().toggle();
    
});



