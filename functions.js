exports.presenteMondiale = function(nome,squadre){

	var i;
	var presente = false;

	for (i=0; i<squadre.length; i++){

		if(squadre[i].name == nome){
			presente = true;
		}

	}
	return presente;

};

exports.giaScontrati = function(squadrauno,squadradue,squadre){
	var i,j;
	var giaScontrati = false;
	for (i=0; i<squadre.length;i++){
		if(squadre.name = squadrauno){	

			if(squadre[i].is_still_in == false){
				giaScontrati = true;
			}

			for(j=0;j<squadre[i].matches.length;j++){
				if(squadre[i].matches[j].opponent == squadradue){
					giaScontrati = true;
				}
			}
			}
	}
	for (i=0; i<squadre.length;i++){
		if(squadre.name = squadradue){	

			if(squadre[i].is_still_in == false){
				giaScontrati = true;
			}


			for(j=0;j<squadre[i].matches.length;j++){
				if(squadre[i].matches[j].opponent == squadrauno){
					giaScontrati = true;
				}
			}
			}
	}



	return giaScontrati;


};

exports.indiceSquadra = function(nome,squadre){

	var i;
	var index = null;
	for(i=0;i<squadre.length;i++){
		if(squadre[i].name == nome){
			return i;
		}
	}
	return index;

};
