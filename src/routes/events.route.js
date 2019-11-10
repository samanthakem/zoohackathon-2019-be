'use strict';

const validateRequest = require("../middleware/auth").validateRequest;

module.exports = function(app) {
  var events = require('../controllers/events.controller');

  app.route('/events')
    .get(validateRequest, events.getAll)

  app.route('/originalData')
      .get(events.get_original)

  app.route('/event')
      .post(validateRequest, events.create)
      .delete(validateRequest, events.delete)
      .get(validateRequest, events.find)

  app.route('/event/:id')
    .put(validateRequest, events.update)

};
