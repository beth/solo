//get the dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);

//serve static files
app.use(express.static(__dirname + '/../client') );


//redirect blank url to index.html
app.get('/', function(req, res) {
  res.render('index');
});

//start listening
var port = process.env.PORT || 8000;
http.listen(port);
