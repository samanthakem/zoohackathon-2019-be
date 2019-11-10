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
exports.update = function (req, res) {

  console.log(req)
  const doc = {
    Users: "Sudeepta"
  }
  database().collection("events").update({_id: req.body._id}, doc, {upsert:true, new:true} , function (err, product) {
    if (err) return res.status(500).send(err);
    res.send('Product updated.');
  });
};

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