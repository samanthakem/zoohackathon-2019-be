'use strict';

const validateRequest = require("../middleware/auth").validateRequest;

module.exports = function(app) {
  var events = require('../controllers/events.controller');

  app.route('/events')
    .get(validateRequest, events.getAll)


  app.route('/event')
      .post(validateRequest, events.create)

  app.route('/event/:id')
    .put(validateRequest, events.update)
    .delete(validateRequest, events.delete)

  app.route('/myEvents')
      .get(validateRequest, events.getMyEvents)
};
