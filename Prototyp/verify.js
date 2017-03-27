AWS.config.region = 'eu-central-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'eu-central-1:727f6bae-42ad-49dd-918b-cc2ab639c29c'
});

var lambda = new AWS.Lambda();
var result = document.getElementById('result');
function getUrlParams() {
var p = {};
var match,
pl = /\+/g,
search = /([^&=]+)=?([^&]*)/g,
decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
query = window.location.search.substring(1);
while (match = search.exec(query))
p[decode(match[1])] = decode(match[2]);
return p;
}
function init() {
var urlParams = getUrlParams();
if (!('email' in urlParams) || !('verify' in urlParams)) {
result.innerHTML = 'Bitte Mail und Bestätigungstoken in der URL angeben.';
} else {
result.innerHTML = 'Bestätigen...';
var input = {
email: urlParams['email'],
verify: urlParams['verify']
};
lambda.invoke({
FunctionName: 'bestaetigen_Lambda',
Payload: JSON.stringify(input)
}, function(err, data) {
if (err) console.log(err, err.stack);
else {
var output = JSON.parse(data.Payload);
if (output.verified) {
result.innerHTML = 'Nutzer ' + input.email +
' wurde bestätigt.';
} else {
result.innerHTML = 'Nutzer ' + input.email +
' wurde nicht bestätigt.';
}
}
});
}
}
window.onload = init();