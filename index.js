//express
var express = require('express');
var bodyParser = require('body-parser');

var modulo = require(__dirname+'/functions.js');
//inspect variables
var fs = require('fs');
var util = require('util');
//var modulo = require("./funzioni.js");

//instantiate express
var app = express();

var maxSquadre = 24; //ipotetico numero di squadre partecipanti alla fase finale

var squadre = []; // array di squadre partecipanti e inserite tramite post /inserisciSquadra

app.use(bodyParser.urlencoded({
    extended: true
}));



/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get("/ottieniSquadra", function(req, res){

	var nomeSquadra = req.body.nomeSquadra || req.query.nomeSquadra;

	console.log(nomeSquadra);

	if(nomeSquadra === "undefined"){
		console.log("Errore");
			res.status(400).json({
					errore: "Errore: errata tipologia di dato"
				});
	}
	else{
		res.status(200).json(squadre[modulo.indiceSquadra(nomeSquadra)]);
	}
});

app.post("/inserisciSquadra", function(req, res){

	var nomeSquadra = req.body.nomeSquadra || req.query.nomeSquadra;

	

	console.log(nomeSquadra);

	if (squadre.length = maxSquadre){
		console.log("Errore");
			res.status(400).json({
					errore: "Errore: errata tipologia di dato"
				});
	}
	else if(nomeSquadra === "undefined"){
		console.log("Errore");
			res.status(400).json({
					errore: "Errore: errata tipologia di dato"
				});
	}
	else if(modulo.presenteMondiale(nomeSquadra,squadre)){
		console.log("Errore");
			res.status(400).json({
					errore: "Errore: nome squadra già presente"
				});
	}
	else{
		var nuovaSquadra = {
		"id": squadre.length,
		"name": nomeSquadra,
		"is_still_in": true,
		"matches": []
	};

		squadre.push(nuovaSquadra);
		res.status(200).json(nuovaSquadra);
	}
});

app.post("/inserisciRisultato", function(req, res){

	var nomeSquadraUno = req.body.nomeSquadraUno || req.query.nomeSquadraUno;
	var nomeSquadraDue = req.body.nomeSquadraDue || req.query.nomeSquadraDue;
	var risultato = req.body.risultato || req.query.risultato;

	console.log(nomeSquadraUno);
	console.log(nomeSquadraDue);
	console.log(risultato)

	if(modulo.giaScontrati(nomeSquadraUno,nomeSquadraDue,squadre)){
		console.log("Errore");
			res.status(400).json({
					errore: "Errore: gia scontrati"
				});
	}
	else {
		var matchuno = {
		"opponent": nomeSquadraDue,
		"outcome": result
	};
		squadre[modulo.indiceSquadra(nomeSquadraUno)].matches.push(matchuno);
		var matchdue = {
		"opponent": nomeSquadraUno,
		"outcome": result
	};
		squadre[modulo.indiceSquadra(nomeSquadraDue)].matches.push(matchdue);

		var out = {
    	"OK": "MATCH INSERITO"
    };
		res.status(200).json(out);

	}
});  

app.put("/modificaPresenza", function(req, res){

	var nomeSquadra = req.body.nomeSquadra || req.query.nomeSquadra;
	var presenza = req.body.presenza || req.query.presenza;

	console.log(nomeSquadra);
	console.log(presenza);

	if(squadre[modulo.indiceSquadra(nomeSquadra)].is_still_in == presenza){
		res.status(400).json({
					errore: "Errore: gia scontrati"
				});
	}
	else{

		squadre[modulo.indiceSquadra(nomeSquadra)].is_still_in = presenza;

		var out = {
    	"OK": "Presenza cambiata"
    };
		res.status(200).json(out);
	}
});


app.use("/", function(req, res){
	res.setHeader("Content-Type", "application/json");
    var out = {
    	error: "404 Not Found",
    	requestedurl: req.url
    }
	res.status(404).json(out);
});

//listen in a specific port
app.listen((process.env.PORT || 65000 || 80));

//check status
console.log('Server running at http://localhost:65000/');