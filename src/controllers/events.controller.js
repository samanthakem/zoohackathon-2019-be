'use strict';

var ObjectID = require('mongodb').ObjectID;
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

exports.delete = function(req, res ){
  database().collection("events").deleteOne(req.params.id, function(err) {
    if(err)
      res.send(err);
    else
      res.json({message: 'Event Deleted!'})
  });
}

// currently one can use search query to find one user
exports.find = function(req, res) {
  database().collection("events").findOne(req.params.Users, function(err, result) {
    if(err) {
      return res.status(500).send(err);
    }
    res.send(result);
});
};

exports.update = (req, res) => {
  let doc = { start: req.body.start,
    end: req.body.end,
    radius: req.body.radius,
    lat: req.body.lat,
    long: req.body.long
  }
  database().collection("events").updateOne({_id: new ObjectID(req.params.id) }, {$set:{ ...doc }}, function(err, result) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
}


// getting all events and filtering
exports.get_original = function(req, res) {
  database().collection("events").find({
  }).toArray((error, result) => {
    if(error) {
      return res.status(500).send(error);
    }
    res.send(result);
});
};
