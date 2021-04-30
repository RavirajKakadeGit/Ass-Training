var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {

  var db = mongoose.connect(config.db, function (err) {
    if (err) {
      console.error('Could not connect to MongoDB!');
      console.log(err);
    }
  });

  require('../models/training.model.js');
  require('../models/subject.model.js');
  require('../models/user.model.js');

  return db;
}