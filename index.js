var express = require('express'),
  app = express(),
  config = require('./config.js'),
  bodyParser = require('body-parser');

const initDatabase = require("./db").initDatabase;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./src/routes/events');
routes(app);

initDatabase(function (err) {
    app.listen(config.app.port);
    console.log('RESTful API server started on: ' + config.app.port);
});
