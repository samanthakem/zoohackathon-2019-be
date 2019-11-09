'use strict';

const database = require("../../db").getDatabase;

exports.get_all = function(req, res) {
  database().collection("events").find({}).toArray((error, result) => {
    if(error) {
        return res.status(500).send(error);
    }
    res.send(result);
  });
};
