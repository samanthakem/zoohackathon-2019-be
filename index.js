var express = require('express'),
  app = express(),
  config = require('./config.js');
  mongoose = require('mongoose'),
  User = require('./src/models/User'),
  bodyParser = require('body-parser');


let uri = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0-evtwo.mongodb.net/test?retryWrites=true&w=majority`;

console.log(uri);

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./src/routes/users'); //importing route
routes(app); //register the route

app.listen(config.port);

console.log('RESTful API server started on: ' + config.port);
