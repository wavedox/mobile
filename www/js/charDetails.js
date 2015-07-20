var fields = "alignment^on:alignment_id^to:alignment_id^show:name.en,gender^on:gender_id^to:gender_id^show:name,guild_roster^on:character_id^to:character_id(guild^show:name),movement_mode^on:movement_mode_id^to:movement_mode_id^show:name.en,origin^on:origin_id^to:origin_id^show:name.en,personality^on:personality_id^to:personality_id^show:name.en,power_source^on:power_source_id^to:power_source_id^show:name.en,power_type^on:power_type_id^to:power_type_id^show:name.en,region^on:region_id^to:region_id,world^on:world_id^to:world_id^show:name";

$( document ).on( "pageshow", "#charDetails", function() {
	$.mobile.loading( 'show' );
	$("#charName").html('&nbsp;');
	$("#charLeague").html('&nbsp;');
	$("#charPve").html('&nbsp;');
	$("#charPvp").html('&nbsp;');
	$("#skillPoints").html('&nbsp;');
	$("#charLevel").html('&nbsp;');
	$("#charWorld").html('&nbsp;');
	$("#charPower").html('&nbsp;');
	$("#charMentor").html('&nbsp;');
	$("#charFaction").html('&nbsp;');
	$("#charOrigin").html('&nbsp;');
	$("#charMovement").html('&nbsp;');
	$("#charWeapon").html('&nbsp;');
	$("#charPersonality").html('&nbsp;');
	$("#charGender").html('&nbsp;');
	$("#charLocation").html('&nbsp;');
	$("#charSkillPoints").html('&nbsp;');
	$("#charHealthStat").html('&nbsp;');
	$("#charPowerStat").html('&nbsp;');
	$("#charDefenceStat").html('&nbsp;');
	$("#charMightStat").html('&nbsp;');
	$("#charPrecisionStat").html('&nbsp;');
	$("#charRestorationStat").html('&nbsp;');
	$("#charVitalizationStat").html('&nbsp;');
	$("#charDominanceStat").html('&nbsp;');
	$("#charToughnessStat").html('&nbsp;');
	$("#paperDoll").html('&nbsp;');
	$("#charFeats").html('&nbsp;');
});

$( document ).on( "pagebeforeshow", "#charDetails", function() {
	$("#collapsible-first").collapsible("disable");
	//$.mobile.loading( 'show' );
	$.ajax({
		url: "http://census.daybreakgames.com/s:dcuolf4ce/get/dcuo:v1/character/" ,
		dataType: "jsonp",
		crossDomain: true,
		async: false,
		data: {
		    	"character_id" : $('#charID').val(),
				"c:join" : fields
		}
	        
	}).then( function ( response ) {
		$.mobile.loading( 'hide' );
			console.log(response);
			if(response.returned > 0){
				var toon = response.character_list[0];
				$("#charName").html(toon.name);
				if(toon.character_id_join_guild_roster){
					$("#charLeague").html(toon.character_id_join_guild_roster.guild_id_join_guild.name);
				}else{
					$("#charLeague").html("<i>No League</i>");
				}
				
				$("#charPve").html(toon.combat_rating);
				$("#charPvp").html(toon.pvp_combat_rating);
				
				$("#skillPoints").html(toon.skill_points + " SP");
				
				$("#charLevel").html(toon.level);
				
				$("#charWorld").html(formatWorldName(toon.world_id_join_world.name));
				$("#charPower").html(toon.power_type_id_join_power_type.name.en);
				$("#charMentor").html(getMentorName(toon.alignment_id,toon.origin_id));
				$("#charFaction").html(toon.alignment_id_join_alignment.name.en);
				$("#charOrigin").html(toon.origin_id_join_origin.name.en);
				$("#charMovement").html(toon.movement_mode_id_join_movement_mode.name.en);
				$("#charWeapon").html(toon.power_source_id_join_power_source.name.en);
				$("#charPersonality").html(toon.personality_id_join_personality.name.en);
				$("#charGender").html(toon.gender_id_join_gender.name);
				if(toon.region_id_join_region){
					$("#charLocation").html(toon.region_id_join_region.name.en);
				}
				
				$("#charSkillPoints").html(toon.skill_points);
				$("#charHealthStat").html(toon.max_health);
				$("#charPowerStat").html(toon.max_power);
				$("#charDefenceStat").html(toon.defense);
				$("#charMightStat").html(toon.might);
				$("#charPrecisionStat").html(toon.precision);
				$("#charRestorationStat").html(toon.restoration);
				$("#charVitalizationStat").html(toon.vitalization);
				$("#charDominanceStat").html(toon.dominance);
				$("#charToughnessStat").html(toon.toughness);
				
				$.ajax({
					url: "http://census.daybreakgames.com/s:dcuolf4ce/count/dcuo:v1/characters_completed_feat" ,
					dataType: "jsonp",
					crossDomain: true,
					data: {
					    	"character_id" : $('#charID').val()
					}
				}).then( function(response){
					$("#charFeats").html(response.count +" / "+ toon.max_feats);
				});
				
				
				$("#paperDollCollapsible").on('collapsibleexpand', function() {
					var myImage = new Image();
					myImage.src = "http://census.daybreakgames.com/files/dcuo/images/character/paperdoll/"+$('#charID').val();
					$("#paperDoll").html('');
					$("#paperDoll").append(myImage);
				});
				
				
			}
	});
});

function formatWorldName(worldName){
	worldName = worldName.replace(" ","");
	return worldName.length > 4 ? worldName.substring(0,4) : worldName;
}
