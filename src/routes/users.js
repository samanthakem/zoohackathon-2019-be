'use strict';
module.exports = function (app) {
    var users = require('../controllers/users');

    app.route('/users')
        .get(users.get_all)
        .post(users.create)
        .delete(users.delete)
        .post(users.update)
        .post(users.alert)
};
