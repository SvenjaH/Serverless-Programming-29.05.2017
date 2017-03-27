AWS.config.region = 'eu-central-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'eu-central-1:727f6bae-42ad-49dd-918b-cc2ab639c29c'
});

var lambda = new AWS.Lambda();
function passwortAendern_() {
var result = document.getElementById('result');
var email = document.getElementById('email');
var altesPasswort = document.getElementById('altes-passwort');
var neuesPasswort = document.getElementById('neues-passwort');
var neuesPasswortBestaetigen = document.getElementById('neues-passwort-bestaetigen');
result.innerHTML = 'Passwort ändern...';
if (email.value == null || email.value == '') {
result.innerHTML = 'Bitte Email-Adresse angeben.';
} else if (altesPasswort.value == null || altesPasswort.value == '') {
result.innerHTML = 'Bitte aktuelles Passwort angeben.';
} else if (neuesPasswort.value == null || neuesPasswort.value == '') {
result.innerHTML = 'Bitte neues Passwort angeben.';
} else if (neuesPasswortBestaetigen.value == null || neuesPasswortBestaetigen.value == '') {
result.innerHTML = 'Bitte neues Passwort erneut eingeben.';
} else if (neuesPasswort.value != neuesPasswortBestaetigen.value) {
result.innerHTML = 'Die Passwörter sind unterschiedlich.';
} else {
var input = {
email: email.value,
passwort: altesPasswort.value
};
lambda.invoke({
FunctionName: 'login_',
Payload: JSON.stringify(input)
}, function(err, data) {
if (err) console.log(err, err.stack);
else {
var output = JSON.parse(data.Payload);
console.log('Id: ' + output.identityId);
console.log('token: ' + output.token);
if (!output.login) {
result.innerHTML = 'Nicht eingeloggt';
} else {
result.innerHTML = 'Eingeloggt mit ID: '
+ output.identityId + '<br>';
var creds = AWS.config.credentials;
creds.params.IdentityId = output.identityId;
creds.params.Logins = {
'cognito-identity.amazonaws.com': output.token
};
creds.expired = true;
var input = {
email: email.value,
altesPasswort: altesPasswort.value,
neuesPasswort: neuesPasswort.value
};
lambda.invoke({
FunctionName: 'passwortAendern_',
Payload: JSON.stringify(input)
}, function(err, data) {
if (err) console.log(err, err.stack);
else {
var output = JSON.parse(data.Payload);
if (!output.changed) {
result.innerHTML = 'Passwort nicht geändert.';
} else {
result.innerHTML = 'Passwort geändert.';
}
}
});
}
}
});
}
}
var form = document.getElementById('form');
form.addEventListener('submit', function(evt) {
evt.preventDefault();
passwortAendern_();
});