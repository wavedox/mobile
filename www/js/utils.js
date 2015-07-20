function getMentorName(alignment_id, origin_id){
	//2330 hero
	//2331 Villain

	//21784 tech
	//21783 meta
	//21785 magic
	
	var mixed = {
    	21784 : { 2330 : 'Batman', 2331: 'Joker'},
    	21783 : { 2330 : 'Superman', 2331: 'Lex Luthor'},
    	21785 : { 2330 : 'WonderWoman', 2331: 'Circe'}
	};
	return mixed[origin_id][alignment_id];
}


function leagueInclinationById(inclination_id){
	switch(inclination_id) {
		case "26050":
		return "<sup class='world'>Heros</sup>";
		case "26051":
		return "<sup class='world'>Vilains</sup>";
	}
}
