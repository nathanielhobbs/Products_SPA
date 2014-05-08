// server.js

// BASE SETUP
// =================================================================================
// set up the modules we need
var express     = require('express');                                   // call express
var app         = express();                                            // define our app using express
var bodyParser  = require('body-parser');                               // we can use this to pull data from an HTTP POST
var mongoose    = require('mongoose');                                  // mongoose will let our backend interface with  MongoDB
var morgan      = require('morgan');                                    // used for sending log messages to the console
var grid        = require('gridfs-stream');                             // gridfs-stream allows streaming files to and from MongoDB
                                                                        // (so we can store images directly in our database)

var configDB    = require('./config/db');                               // get our database configuration

// CONFIGURATION
// =================================================================================

var port = process.env.PORT || 8080;                                    // set our port
app.use(morgan('dev'));                                                 // log every request to the console
app.use(bodyParser());                                                  // tell our app to actually use the bodyParser package
app.use(express.static(__dirname + '/public'));                         // set the static files location /public/img will be /img for users

// Set up the database -------------------------------------------------------------

// set up keep alive so that we don't disconnect from the database 
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

//var dbConnection = mongoose.createConnection(configDB.url);    // connect to our database
//var dbConnection = mongoose.createConnection(configDB.url);                      // connect to our database
mongoose.connect(configDB.url, options);
var dbConnection = mongoose.connection;

// give message if mongoDB fails to connect
dbConnection.on('error', function(){
    console.error.bind(console, 'MongoDB connection error:');
})
dbConnection.once('open', function(){                                   // wait for the db connection to establish, then 
    console.log("MongoDB connection successful");
    var gridfs = grid(dbConnection.db, mongoose.mongo);                 // connect grid to our data base
})

// ESTABLISH ROUTES
// ==================================================================================
require('./app/routes')(app);                                           // pass the applicaiton and fully configured passport into our routes

// START THE SERVER
// ==================================================================================
app.listen(port);
console.log('The server is up and running on port ' + port);
exports = module.exports = app;                                         // expose the application
