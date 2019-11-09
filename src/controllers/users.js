'use strict';

var mongoose = require('mongoose'),
  event = mongoose.model('events');

// getMyEvents API
exports.get_all = function(req, res) {
    event.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
// register Event API
exports.create = function(req, res) {
    var new_user = new event(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };
// Delete Event API
exports.delete = function(req, res ){
    event.findByIdAndRemove(req.params.id, function(err) {
        if(err)
            res.send(err);
        else
            res.json({message: 'Event Deleted!'})
    });
}
// Update Event API
exports.update = function(req, res ){
    event.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if(err)
            res.send(err);
        else
            res.send({message: 'Event Updated!'})
    });
}


