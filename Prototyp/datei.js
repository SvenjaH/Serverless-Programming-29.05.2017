AWS.config.update({
  accessKeyId: 'AKIAJKGR53U45ZT2QOMA',
  secretAccessKey: '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',
  region: 'eu-central-1'
});

var S3 = new AWS.S3({params: {Bucket: 'svenja-test'}});
var Dynamo = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});

// Fetch the gallery name from the gallery input
function getGalleryName() {
  return document.getElementById('gallery-name').value;
}

// Grab a reference to the upload button
let uploadButton = document.getElementById('upload-button');

// Make the button respond to clicks
uploadButton.addEventListener('click', function() {
  let fileChooser = document.getElementById('file-chooser');
  let file = fileChooser.files[0];

  // Check that the user has specified a file to upload
  if (!file) {
    alert("You must choose a file to upload!");
    return;
  }

  // Check the MIME type is an image
  if (file.type.indexOf("image") == -1) {
    alert("You may only upload images");
    return;
  }

  // Get the gallery name and check that it isn't empty
  let galleryName = getGalleryName();
  if (!galleryName) {
    alert("You need to enter a gallery name");
    return;
  }

  // Specify the S3 upload parameters
  let params = {
    Key: galleryName + '/' + file.name,
    ContentType: file.type,
    Body: file,
    ACL: 'public-read'
  };

  // Upload the file
  S3.upload(params, function(err, data) {
    if (err) {
      alert(err);
    } else {
      alert("Image uploaded successfully!");
    }
  });
});