'use strict';
module.exports = function(app) {
  var events = require('../controllers/events.controller');

  app.route('/events')
    .get(events.get_all)
};
