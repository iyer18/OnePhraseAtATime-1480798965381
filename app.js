/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// set up
var express = require('express');
// mongoose for mongodb
var mongoose = require('mongoose');
// log requests to the console (express4)
var logger = require('morgan'); 
var mongoURL = 'mongodb://2ee767cd-438d-4b4e-a641-e50187d425e3:534deb6a-c8b2-477d-9b20-3190aa78c9ea@23.246.199.101:10079/db';
//var mongoURL = 'localhost/db';
// pull information from HTML POST (express4)
var bodyParser = require('body-parser'); 
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override'); 
// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');
// create a new express server
var app = express();

// configuration: connect to mongoDB database on modulus.io
mongoose.connect(mongoURL);
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'})); 		
// parse application/json	
app.use(bodyParser.json()); 									
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(methodOverride());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

require('./app/routes.js')(app);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
