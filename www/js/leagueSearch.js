$( document ).on( "pagecreate", "#leagueSearch", function() {
	
	$( "#autocompleteLeague" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
            worldID = $("#leagueSearch input[name=radio-choice-league-h-2]:checked").val();
        $ul.html( "" );
        if ( value && value.length > 2 ) {
        	
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview( "refresh" );
            $.mobile.loading( 'show' );
            $.ajax({
                url: "http://census.daybreakgames.com/s:dcuolf4ce/get/dcuo:v1/guild",
                dataType: "jsonp",
                crossDomain: true,
                data: {
                	"name" : "^"+ $input.val(),
                	"world_id" : worldID,
                	"c:lang" : "en",
                	"c:case" : false,
	               	"c:show" : "name,guild_id,world_id,character_alignment_id",  
    				"c:limit" : 10, 
                	"c:exactMatchFirst" :true
                }
            })
            .then( function ( response ) {
            	$.mobile.loading( 'hide' );
            	
            	$ul.html( "" );
                $.each( response.guild_list, function ( i, obj ) {
					createLeagueListElement(obj).appendTo($ul);
               	});
               	$ul.listview( "refresh" );
               	$ul.trigger( "updatelayout");
               
            });
        }
    });
   
    $('.ui-filterable').on('click', '.ui-input-clear', function(e){
    	$( "#autocompleteLeague" ).html("");
	});
});


function createLeagueListElement(obj){
	var name = obj.name;
	var leagueID = obj.guild_id;
	var worldID = obj.world_id;
	var inclinationID = obj.character_alignment_id;
	
	var $li = $("<li />");
	var $a =  $("<a />", {html: name + leagueInclinationById(inclinationID), href: "#leagueDetails", onclick: "$('#leagueID').val("+leagueID+")"});
	$a.attr("data-transition","slide");
	$a.appendTo($li);
	
	return $li;
}

function clearLeagueSearch(){
	$('#autocompleteLeague').html("");
	$('#leagueSearch input[data-type="search"]').val("");
}

