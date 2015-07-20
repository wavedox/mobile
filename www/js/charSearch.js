$( document ).on( "pagecreate", "#charSearch", function() {
	
	$( "#autocompleteChar" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
            worldID = $("#charSearch input[name=radio-choice-h-2]:checked").val();
        $ul.html( "" );
        if ( value && value.length > 2 ) {
        	
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview( "refresh" );
            $.mobile.loading( 'show' );
            $.ajax({
                url: "http://census.daybreakgames.com/s:dcuolf4ce/get/dcuo:v1/character",
                dataType: "jsonp",
                crossDomain: true,
                data: {
                	"name" : "^"+ $input.val(),
                	"active" : true,
                	"deleted" : false,
                	"world_id" : worldID,
                	"combat_rating" : ">1",
                	"skill_points": ">1",
                	"c:lang" : "en",
                	"c:case" : false,
	               	"c:show" : "name,character_id,world_id",  
    				"c:limit" : 10, 
                	"c:exactMatchFirst" :true
                }
            })
            .then( function ( response ) {
            	$.mobile.loading( 'hide' );
            	
            	$ul.html( "" );
                $.each( response.character_list, function ( i, obj ) {
                		createCharListElement(obj).appendTo($ul);
               	});
               	$ul.listview( "refresh" );
               	$ul.trigger( "updatelayout");
               
            });
        }
    });
   
    $('.ui-filterable').on('click', '.ui-input-clear', function(e){
    	$( "#autocompleteChar" ).html("");
	});
});


function createCharListElement(obj){
	var name = obj.name;
	var charID = obj.character_id;
	var worldID = obj.world_id;
	var $li = $("<li />");
	var $a =  $("<a />", {html: name + worldById(worldID), href: "#charDetails", onclick: "$('#charID').val("+charID+")"});
	$a.attr("data-transition","slide");
	$a.appendTo($li);
	
	return $li;
}

function clearCharSearch(){
	$('#autocompleteChar').html("");
	$('#charSearch input[data-type="search"]').val("");
}

function worldById(world_id){
	switch(world_id) {
		case "1":
		return "<sup class='world'>USPC</sup>";
		case "2":
		return "<sup class='world'>USPS</sup>";
		case "3":
		return "<sup class='world'>EUPC</sup>";
		case "4":
		return "<sup class='world'>EUPS</sup>";
	}
}

