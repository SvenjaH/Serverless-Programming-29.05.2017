/*
title: dateiOrdner.js
description: Aufbau der Funktion zum Hochladen einer Datei ím Ordner
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

// Der eingegebe Ordnernamen wird aus dem Feld ausgelesen
function getOrdnername() {
  return document.getElementById('ordnername').value;
}

// Verknüpfung des Hochladebuttons mit einer Variablen herstellen
var hochladen = document.getElementById('hochladen');

// Der Hochladebutton reagiert durch den EventListener auf Klicks
hochladen.addEventListener('click', function() {
  var auswahl = document.getElementById('auswahl');
  var datei = auswahl.files[0];

  // Überprüfung ob eine Datei ausgewählt wurde
  if (!datei) {
    alert("Bitte eine Datei auswählen");
    return;
  }

  // Überprüfung ob Auswahl eine PD-Datei ist
  if (datei.type.indexOf("application/pdf") == -1) {
    alert("Falsches Format, bitte eine PDF-Datei auswählen");
    return;
  }

  // Überprüfung ob ein Ordnername angegeben wurde und Ausgabe Hinweis wenn nicht
  var ordnername = getOrdnername();
  if (!ordnername) {
    alert("Bitte Ordnernamen eingeben");
    return;
	// Abfrage ob Ordnername "images", "images2" oder "ohneOrdner" eingegeben wurde und diese blockieren
   } else if (ordnername == 'images' || ordnername == 'images2' || ordnername == 'ohneOrdner') {
	  alert("Dieser Ordner wird vom System genutzt, bitte anderen Namen wählen");
	  return;
   }

  // Parameter für das Hochladen in den S3 Bucket werden defniert
  var params = {
    Key: ordnername + '/' + datei.name,
    ContentType: datei.type,
    Body: datei,
    ACL: 'public-read'
  };

  // Die Datei wird in den anfang defnierten Bucket hochgeladen
  S3.upload(params, function(err, data) {
    if (err) {
      alert(err);
    } else {
      alert('Die Datei wurde hochgeladen');
    }
  });
});

// Verknüpfung des Buttons zur Inhaltsausgabe eines Ordners mit Variablen herstellen
var ordnerinhalt = document.getElementById('lnhalt');

// Beim Betätigen des Buttons wird die Liste der Dateien des Ordners aus DynamoDB ausgelesen
ordnerinhalt.addEventListener('click', function() {
  var ordnername = getOrdnername();
  if (!ordnername) { // Überprüfen ob ein Ordnername angegeben wurde
    alert("Bitte einen Ordnernamen eingeben");
    return;
	// der Ordner für Hochladen ohne Ordner ist nicht aufrufbar da dies als Gastfunktion gedacht ich
  } else if (ordnername == 'ohneOrdner') {
		alert ("Dieser Ordner ist nicht für intern reserviert, bitte anderen anderen Namen wählen");
		return;
	}

  // Ausgabebutton des Ordners ausgrauen damit keine doppelte Verwendung möglich ist
  ordnerinhalt.disabled = true;
  // // Entsorgung bereits vorher gemachter Auslesungen
  leerliste();

  // Wenn alle Dateien des Ordners ausgelesen wurden, wird der Button wieder freigegeben
  listeOrdnerinhalt(ordnername, function(err) {
    if (err) {
      alert("Dynamo error: " + err);
    }
    ordnerinhalt.disabled = false;
  });
})

// Alle Dateien des Ordners werden hinsichtlich des Dateipfades und des Ordnernamens definiert
// Die Parameter werden an die Datenbank übergeben zur Speicherung der Daten
// Die Funktion wird so lange durchgeführt wie es Elemente in der Inhaltsliste gibt
// und dann wird der Callback ausgeführt.
function listeOrdnerinhalt (ordnername, cb, startKey) {
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

// Es wird eine Liste in HTML erstellt, bei der für jedes Element der Dateiliste ein Link mit Dateiinformationen erstellt wird
function dateiHinzufügen(imagePath) {
  var ul = document.getElementById('image-list');
  var li = document.createElement('li');
  var a = document.createElement('a');
  var text = document.createTextNode(imagePath);
   
  a.href =  'https://s3.eu-central-1.amazonaws.com/svenja-test/' + imagePath;
  a.target = '_blank';
  
  li.appendChild(a);
  a.appendChild(text);
  ul.appendChild(li);
}

// Nach Abschluss werden alle Elemente der Liste entfernt
function leerliste() {
  document.getElementById('image-list').innerHTML = '';
}