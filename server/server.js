
// grabbing packages we need
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var apiRoutes = require('./routes/routes.js')
var path = require('path')

// Controllers

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//This grabs static files in the head of my shell html
app.use(express.static(path.join(__dirname, '../client')))

// Database setup
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chessData')
// Routes

//the means /api will be fixed to routes using apiRoutes
app.use("/api", apiRoutes)

app.get('/', function(req, res){
  console.log('/ route firing')
  res.sendFile('shell.html', {root : './client/partials'})
});

// Creating Server and Listening for Connections \\
var port = 80
app.listen(port, function(){
  console.log('Server running on port ' + port);

})
