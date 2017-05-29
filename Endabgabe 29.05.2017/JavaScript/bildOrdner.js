/*
title: bildOrdner.js
description: Aufbau der Funktion zum Hochladen eines Bildes ím Ordner
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

// Verbindung zu S3 und der DynamoDB Tabelle herstellen
var S3 = new AWS.S3({params: {Bucket: 'svenja-test'}});
var Dynamo = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});

// Auslesen des eingetragenen Ordnernamens der HTML
function getOrdnername() {
  return document.getElementById('ordnername').value;
}

// Verknüpfung des Hochladebuttons mit einer Variablen
var hochladen = document.getElementById('hochladen');

// Der Button kann durch EventListener auf Klicks reagieren
hochladen.addEventListener('click', function() {
  var auswahl = document.getElementById('auswahl');
  var datei = auswahl.files[0];

  // Überprüfung ob eine Datei ausgewählt wurde
  if (!datei) {
    alert("Bitte ein Bild auswählen");
    return;
  }

  // Überprüfung auf das richtige Dateiformat eines Bildes
  if (datei.type.indexOf("image") == -1) {
    alert("Falsches Format, bitte eine Bilddatei auswählen");
    return;
  }

  // Überprüfung ob ein Ordnername angegeben wurde und Ausgabe Hinweis wenn nicht
  var ordnername = getOrdnername();
  if (!ordnername) {
    alert("Bitte Ordnernamen angeben");
    return;
	// Abfrage ob Ordnername "images", "images2" oder "ohneOrdner" eingegeben wurde und diese blockieren
  } else if (ordnername == 'images' || ordnername == 'images2' || ordnername == 'ohneOrdner') {
	  alert("Dieser Ordner wird vom System genutzt, bitte anderen Namen wählen");
	  return;
  }

  // Festlegung der Parameter für die Speicherung in S3
  var params = {
    Key: ordnername + '/' + datei.name,
    ContentType: datei.type,
    Body: datei,
    ACL: 'public-read'
  };

  // Hochladen des Bildes im zu Anfang defnierten S3 Bucket
  S3.upload(params, function(err, data) {
    if (err) {
      alert(err);
    } else {
      alert("Bild wurde hochgeladen");
    }
  });
});

// Verknüpfung des Buttons zur Inhaltsausgabe eines Ordners mit Variablen herstellen
var inhaltsliste = document.getElementById('inhalt');

// Beim Betätigen des Buttons wird die Liste der Dateien des Ordners aus DynamoDB ausgelesen
inhaltsliste.addEventListener('click', function() {
  var ordnername = getOrdnername();
  if (!ordnername) { // Überprüfung ob eine Ordnername angegeben wurde
    alert("Bitte einen Ordnernamen angeben");
    return;
	// der Ordner für Hochladen ohne Ordner ist nicht aufrufbar da dies als Gastfunktion gedacht ich
	} else if (ordnername == 'ohneOrdner') { 
		alert ("Dieser Ordner ist nicht für intern reserviert, bitte anderen anderen Namen wählen");
		return;
	}

  // Der Button zum Aufrufen des Orderinhalts wird ausgegraut, damit er nicht zeitgleich nochmals verwendet werden kann
  inhaltsliste.disabled = true;
  // Entsorgung bereits vorher gemachter Auslesungen
  leerliste();

  // Nachdem alle Dateien des Ordners ausgelesen wurde, wird der Button wieder freigegeben
  listeOrdnerinhalt(ordnername, function(err) {
    if (err) {
      alert("Dynamo error: " + err);
    }
    inhaltsliste.disabled = false;
  });
})

// Alle Dateien des Ordners werden hinsichtlich des Dateipfades und des Ordnernamens definiert
// Die Parameter werden an die Datenbank übergeben zur Speicherung der Daten
// Die Funktion wird so lange durchgeführt wie es Elemente in der INhaltsliste gibt
// und dann wird der Callback ausgeführt.
function listeOrdnerinhalt(ordnername, cb, startKey) {
  var params = {
    TableName: 'images-index',
    ProjectionExpression: 'file_path',
    KeyConditionExpression: 'gallery = :galleryname',
    ExpressionAttributeValues: {
      ":galleryname": ordnername
    },
    ExclusiveStartKey: startKey,
  }

  Dynamo.query(params, function (err, data) {
    if (err) {
      return cb(err);
    }

    for (item of data.Items) {
      dateiHinzufügen(item.file_path);
    }
  })
}

// Es wird eine Dateiliste erstellt, bei der eine Liste mit Bildelementen ausgegeben wird
// Je Element in der Liste wird ein Bild für die Ordnerübersicht erstellt. Diese können angeklickt werden
function dateiHinzufügen(imagePath) {
  var ul = document.getElementById('image-list');
  var li = document.createElement('li');
  var img = document.createElement('img');
  var a = document.createElement('a');
   
  a.href =  'https://s3.eu-central-1.amazonaws.com/svenja-test/' + imagePath;
  a.target = '_blanket';
  img.src = 'https://s3.eu-central-1.amazonaws.com/svenja-test/' + imagePath;
  img.style.maxWidth = "600px";

  li.appendChild(a);
  a.appendChild(img);
  ul.appendChild(li);
}

// Alles Elemente werden aus der Dateiliste entfernt und die in HTML ausgegebene Liste ist dann leer
function leerliste() {
  document.getElementById('image-list').innerHTML = '';
}