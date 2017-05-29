/*
title: dateiOrdner.js
description: Aufbau der Funktion zum Hochladen einer Datei ím Ordner
author: Svenja Haberditzl
help from: AWS Tutorial "Using Lambda with Amazon S3 
           (http://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html)
software: Netbeans 
*/

// Angabe der Zugangsdaten für den AWS Account (Keys sind gelöscht, da sie nicht auf Guthub auftauschen dürfen)
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'eu-central-1'
});

// Verknüpfung mit S3 Bucket erstellen, der die Originaldaten beinhalten wird
var S3 = new AWS.S3({params: {Bucket: 'svenja'}});

// Funktion zur Erstellung einer Vorschau, so wie beim Bilder Hochladen ohne Ordner
function dateiauswahl(evt) {
		var bilder = evt.target.files; // Erstellung Dateiliste
		// Die Bilder aus der Dateiliste werden ausgelesen, so lange wie es Elemente in der Dateiliste gibt
		for (var i = 0, f; f = bilder[i]; i++) {
			// Überprüfung ob eine Bilddatei ausgewählt wurde, sonst Hinweis dazu
			if (!f.type.match('image.*')) {
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function (datei) {
				return function (e) {
					// Festlegung der Eigenschaften der Vorschau und Erzeugung dieser
					var vorschau = document.createElement('img');
					var a = document.createElement('a');
					vorschau.className = 'vorschau';
					vorschau.src = e.target.result;
					vorschau.title = datei.name;
					vorschau.style.maxWidth = "300px";
					var test = 'https://s3.eu-central-1.amazonaws.com/svenja-test/images2/' + datei.name;
					a.href =  test.slice(0, -4) + '.jpg';
					a.target = '_blanket';  
					a.appendChild(vorschau);
					// Die Liste der Bilder wird ausgegeben und kann angeklickt werden zum Aufrufen des Bildes
					document.getElementById('list')
						.insertBefore(a, null);
				};
			})(f);
			// Bilder als Data URL auslesen.
			reader.readAsDataURL(f);
		}
	}
	// Bei einer erneuten Auswahl eines Bildes die vorherigen löschen
document.getElementById('auswahl')
	.addEventListener('change', dateiauswahl, false);
	
// Verknüpfung des Hochladebuttons mit einer Variablen
var uploadButton = document.getElementById('hochladen');

// Der Button kann durch EventListener auf Klicks reagieren
uploadButton.addEventListener('click', function() {
  var fileChooser = document.getElementById('auswahl');
  var datei = fileChooser.files[0];

  // Überprüfung ob ein Bild ausgewählt wurde
  if (!datei) {
    alert("Bitte ein Bild auswählen");
    return;
  }

  // Überprüfung auf das richtige Dateiformat
  if (datei.type.indexOf("image") == -1) {
    alert("Bitte eine Bilddatei auswählen");
    return;
  }

  // Festlegung der Parameter für die Speicherung in S3
  var parameter = {
    Key: 'images2/' + datei.name,
    ContentType: datei.type,
    Body: datei,
    ACL: 'public-read'
  };

  // Hochladen des Bildes im zu Anfang defnierten S3 Bucket
  S3.upload(parameter, function(err, data) {
    if (err) {
      alert(err);
    } else {
      alert("Bild wurde hochgeladen");
    }
  });
});