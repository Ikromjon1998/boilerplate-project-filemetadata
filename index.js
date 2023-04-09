// import required packages and modules
const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

// create an instance of the express app
const app = express();

// enable cross-origin resource sharing
app.use(cors());

// serve static files from the public directory
app.use('/public', express.static(process.cwd() + '/public'));

// serve the homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// define a POST route to handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file was uploaded.' });
  }

  // get file information from the uploaded file
  const { originalname, mimetype, size } = req.file;

  // send a JSON response with the file information
  res.json({ name: originalname, type: mimetype, size: size });
});

// start the server and listen for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
