'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('events', eventSchema);
