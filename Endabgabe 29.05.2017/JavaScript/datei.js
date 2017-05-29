/*
title: datei.js
description: Aufbau der Funktion zum Hochladen einer Datei
author: Svenja Haberditzl
help from: AWS Tutorial "JavaScript in the Browser"
           (https://aws.amazon.com/de/developers/getting-started/browser/)
software: Netbeans 8.2
*/

// Angabe der Zugangsdaten für den AWS Account (Keys sind gelöscht, da sie nicht auf Guthub auftauschen dürfen)
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'eu-central-1'
});

// Verknüpfung mit derm verwendeten S3 Bucket
var S3 = new AWS.S3({params: {Bucket: 'svenja-test'}});

/* Funktion zur Erstellung der Vorschau der ausgewählten Datei zwecks Überprüfung dieser und der Möglichkeit die Datei 
   nach Hochladen per Link zu öffnen*/
function dateiauswahl(evt) {
		var dateien = evt.target.files; // Die Dateien werden in eine Liste gespeichert
		// Array zum Speichern der Eigenschaften der Vorschau
		var ausgabe = [];
		
		/* Schleife, die die zu ausgebenen Eigenschaften der Datei den Vorgang so lange wiederholt bis die Liste der Dateien abgearbeitet ist
		   Anmerkung: Kommt in dieser Anwendung durch die Restriktionen von S3 nicht zum Tragen, kann aber für eine andere Umsetzung
		   so verwendet werden wie es am Anfang gedacht war */
		for (var i = 0, f; f = dateien[i]; i++) {
			var src = 'http://svenja-test.s3-website.eu-central-1.amazonaws.com/' + f.name;
			ausgabe.push('<li><strong><a href="',src,'" target="_blank">',f.name,'</a> - ', f.size, ' bytes</li>');
		}
		// Ausgabe in Form einer Liste erstellen durch auslesen und ausgeben des Arrays
		document.getElementById('list')
			.innerHTML = '<ul>' + ausgabe.join('') + '</ul>';
	}
	// Bei erneutem Betätigen des Auswahlbuttons erfolgt neuer Aufruf
document.getElementById('auswahl')
	.addEventListener('change', dateiauswahl, false);

// Verknüpfung des Hochladebuttons mit Variable
var hochladen = document.getElementById('hochladen');

// Hochladebutton reagiert durch EventListener auf Klicks
hochladen.addEventListener('click', function() {
  var auswahl = document.getElementById('auswahl');
  var datei = auswahl.files[0];

  // Überprüfung ob eine Datei ausgewählt wurde
  if (!datei) {
    alert("Bitte eine Datei auswählen");
    return;
  }

  // Überprüfung ob eine PDF-Datei ausgewählt wurde
  if (datei.type.indexOf("application/pdf") == -1) {
    alert("Falsches Format, bitte eine PDF-Datei auswählen");
    return;
  }

  // Parameter für das Hochladen in S3 definieren
  var params = {
	Key: 'ohneOrdner/' + datei.name,
    ContentType: datei.type,
    Body: datei,
    ACL: 'public-read'
  };

  // Datei wird hochgeladen zu S3
  S3.upload(params, function(err, data) {
    if (err) {
      alert(err);
    } else {
      alert('Datei wurde hochgeladen');
    }
  });
});