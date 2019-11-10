'use strict';

const database = require("../../db").getDatabase;
// getting all events
exports.get_all = function(req, res) {
  database().collection("events").find({}).toArray((error, result) => {
    if(error) {
        return res.status(500).send(error);
    }
    res.send(result);
  });
};
// delete one event
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
// update one event
exports.update = function(req, res) {
  var hero = {
    Users: req.params.Users,
  }
  database().collection("events").update({_id: req.params.id}, hero, function(err, hero) {
    if(err) {
      res.json({
        error : err
      })
    }
    res.json({
      message : "Hero updated successfully"
    })
  })
}
