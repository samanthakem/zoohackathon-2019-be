'use strict';

var ObjectID = require('mongodb').ObjectID;
const database = require("../middleware/db").getDatabase;
const getDistanceFromLatLonInKm = require("../util/helper").getDistanceFromLatLonInKm;

exports.getAll = (req, res) => {
  let start = new Date(req.query.start);
  let end = new Date(req.query.end);
  let lat = req.query.lat;
  let long = req.query.long;
  let radius = req.query.radius;
  let keyword = req.query.keyword;
  var query = { $or : [{ "topics": keyword }]};
  if(!keyword)
    query = {};

  database().collection("events").find({
    $and: [
      query,
      { $or : [
        { $and: [ {start : { $lte : start }}, {end: { $gte: start }}] },
        { $and: [ {start : { $gte : start }}, {end: { $lte: end }}] },
        { $and: [ {start : { $lte : end }}, {end: { $gte: end }}] },
        { $and: [ {start : { $lte : start }}, {end: { $gte: end }}] }
        ]
      }
    ]
  }).toArray((error, result) => {
    if(error) {
        return res.status(500).send(error);
    }
    var geospatialInt = [];
    result.forEach(el => {
      let [lon1,lat1] = el.loc.coordinates;
      let distance = getDistanceFromLatLonInKm(lat1,lon1,lat,long);
      if(distance < (parseFloat(radius) + parseFloat(el.radius))) {
        geospatialInt.push(el);
      }
    });
    res.send(geospatialInt);
  });
};

exports.getMyEvents = function(req, res) {
    database().collection("events").find({createdBy: req.query.createdBy}).toArray((error, result) => {
      if(error) {
          return res.status(500).send(error);
      }
      res.send(result);
    });
};

exports.create = (req, res) => {
  const newEvent = {
    start: new Date(req.body.start),
    end: new Date(req.body.end),
    radius: req.body.radius,
    loc: {
      type: "Point",
      coordinates: [req.body.long, req.body.lat]
    },
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

exports.delete = function(req, res ) {
  database().collection("events").deleteOne({_id: new ObjectID(req.params.id)}, function(err) {
    if(err)
      res.send(err);
    else
      res.json({message: 'Event Deleted!'})
  });
}

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
