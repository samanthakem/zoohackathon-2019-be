'use strict';
module.exports = function(app) {
  var events = require('../controllers/events.controller');

  app.route('/events')
    .get(events.get_all)

  app.route('/originalData')
      .get(events.get_original)


  app.route('/event')
      .delete(events.delete)
      .put(events.update)
      .get(events.find)
};
