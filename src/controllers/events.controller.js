'use strict';

// _id
// :
// 5dc7903ebf8caaaada51fcf1
// start
// :
// "2019-11-18"
// end
// :
// "2019-11-30"
// radius
// :
// 0.7
// lat
// :
// -0.565787
// long
// :
// 25.260701
// createdBy
// :
// "5dc7878b088759a13c774c84"
// _id
// :
// 5dc794799c94deafac6297e0
// start
// :
// "2019-11-19"
// end
// :
// "2019-11-30"
// radius
// :
// 0.8
// lat
// :
// -0.565787
// long
// :
// 25.260701
// createdBy
// :
// "5dc7878b088759a13c774c84"

var ObjectID = require('mongodb').ObjectID;
const database = require("../middleware/db").getDatabase;
const calculateDistance = require("../util/helper").calculateDistance;

exports.getAll = (req, res) => {
  let start = new Date(req.body.start);
  let end = new Date(req.body.end);
  let lat = req.body.lat;
  let long = req.body.long;
  let radius = req.body.radius;

  database().collection("events").find({
    $and: [
      {
        "loc": {
          $geoWithin: {
            $centerSphere: [[ long,lat ], radius/3963.2 ]
          }
       }
     },
     { $or : [
      { $and: [ {start : { $lte : start }}, {end: { $gte: start }}] },
      { $and: [ {start : { $gte : start }}, {end: { $lte: end }}] },
      { $and: [ {start : { $lte : end }}, {end: { $gte: end }}] },
      { $and: [ {start : { $lte : start }}, {end: { $gte: end }}] }
     ]
    }]
  }).toArray((error, result) => {
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
