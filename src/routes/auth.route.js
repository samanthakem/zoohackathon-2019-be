'use strict';

const validateRequest = require("../middleware/auth").validateRequest;

module.exports = function(app) {
  var users = require('../controllers/users.controller');

  app.route('/user')
    .post(users.create)
    .get(validateRequest, users.current);
};
