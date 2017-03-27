AWS.config.region = 'eu-central-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'eu-central-1:727f6bae-42ad-49dd-918b-cc2ab639c29c'
});

var lambda = new AWS.Lambda();
function registrieren_() {
var result = document.getElementById('result');
var email = document.getElementById('email');
var passwort = document.getElementById('passwort');
var passwortBestaetigen = document.getElementById('passwort-bestaetigen');
result.innerHTML = 'Registrieren...';
if (email.value == null || email.value == '') {
result.innerHTML = 'Bitte Email-Adresse angeben.';
} else if (passwort.value == null || passwort.value == '') {
result.innerHTML = 'Bitte Passwort angeben';
} else if (passwortBestaetigen.value == null || passwortBestaetigen.value == '') {
result.innerHTML = 'Bitte Passwort erneut eingeben.';
} else if (passwort.value != passwortBestaetigen.value) {
result.innerHTML = 'Passwörter sind unterschiedlich.';
} else {
var input = {
email: email.value,
passwort: passwort.value,
};
lambda.invoke({
FunctionName: 'registrieren_',
Payload: JSON.stringify(input)
}, function(err, data) {
if (err) console.log(err, err.stack);
else {
var output = JSON.parse(data.Payload);
if (output.created) {
result.innerHTML = 'Nutzer ' + input.email + ' wurde erstellt. Bitte Bestätigungsmail abrufen und den drt enthaltenen Link aktivieren.';
} else {
result.innerHTML = 'Nutzer wurde nicht erstellt..';
}
}
});
}
}

var form = document.getElementById('form');
form.addEventListener('submit', function(evt) {
evt.preventDefault();
registrieren_();
});