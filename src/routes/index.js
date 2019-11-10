'use strict';

var events = require('./events.route');
var auth = require('./auth.route');

module.exports = function(app) {
    events(app),
    auth(app)
};
