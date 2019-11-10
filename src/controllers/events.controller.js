'use strict';

const database = require("../middleware/db").getDatabase;

exports.get_all = (req, res) => {
  database().collection("events").find({}).toArray((error, result) => {
    if(error) {
        return res.status(500).send(error);
    }
    res.send(result);
  });
};
