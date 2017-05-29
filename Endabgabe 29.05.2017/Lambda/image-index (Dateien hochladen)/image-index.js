/*
title: datei.js
description: Aufbau der Funktion zum Hochladen einer Datei
author: Svenja Haberditzl
help from: AWS Tutorial "JavaScript in the Browser"
           (https://aws.amazon.com/de/developers/getting-started/browser/)
software: Netbeans 8.2
*/

// Eine Verbindung zur DynamoDB Tabelle wird hergestellt
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});

// eyports.handler wird definiert
exports.handler = function(event, context) {
    var file_path = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    var gallery = file_path.split("/")[0]; // Festlegen des Ordnernamens

	// Parameter zum Speichern der Datei in die Tabelle der Datenbank
    var params = {
        TableName: 'images-index',
        Item: {
            gallery: gallery,
            file_path: file_path
        }
    };

	// Ausführung des Speichervorgangs
    dynamo.put(params, context.done);
};