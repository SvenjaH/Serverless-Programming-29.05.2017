AWS.config.region = 'eu-central-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'eu-central-1:727f6bae-42ad-49dd-918b-cc2ab639c29c'
});

var lambda = new AWS.Lambda();
function login_() {
var result = document.getElementById('result');
var email = document.getElementById('email');
var passwort = document.getElementById('passwort');
result.innerHTML = 'Login...';
if (email.value == null || email.value == '') {
result.innerHTML = 'Bitte Email-Adresse angeben.';
} else if (passwort.value == null || passwort.value == '') {
result.innerHTML = 'Bitte Passwort angeben.';
} else {
var input = {
email: email.value,
passwort: passwort.value
};
lambda.invoke({
FunctionName: 'login_',
Payload: JSON.stringify(input)
}, function(err, data) {
if (err) console.log(err, err.stack);
else {
var output = JSON.parse(data.Payload);
if (!output.login) {
result.innerHTML = '<b>Nicht</b> eingeloggt';
} else {
result.innerHTML = 'Eingeloggt mit ID: '
+ output.identityId + '<br>';
var creds = AWS.config.credentials;
creds.params.IdentityId = output.identityId;
creds.params.Logins = {
'cognito-identity.amazonaws.com': output.token
};
creds.expired = true;
// Do something with the authenticated role
}
}
});
}
}
var form = document.getElementById('form');
form.addEventListener('submit', function(evt) {
evt.preventDefault();
login_();
});