'use strict';

const database = require("../middleware/db").getDatabase;
const calculateDistance = require("../util/helper").calculateDistance;

exports.getAll = (req, res) => {
  database().collection("events").find({}).toArray((error, result) => {
    if(error) {
        return res.status(500).send(error);
    }
    res.send(result);
  });
};

exports.create = (req, res) => {
  const newEvent = {
    start: req.body.start,
    end: req.body.end,
    radius: req.body.radius,
    lat: req.body.lat,
    long: req.body.long,
    createdBy: req.user._id
  }

  try {
    database().collection("events").insertOne(newEvent).then((data) => {
      return res.status(200).send({ eventId: data.insertedId });
    });
  } catch (e) {
    return res.status(500).send(e);
  }

};
