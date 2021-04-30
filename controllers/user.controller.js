var mask = require('json-mask');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var User = mongoose.model('User');
var cipherService = require('../services/cipher');

module.exports = {

  /**
   * Register User
   */
  register: function (req, res, next) {
    var userDetails = req.body;
    User.create(userDetails, function (err, data) {
      if (err) {
        next(err);
      }
      res.json({ status: 'success', message: 'User register successfully', data: mask(data, '_id,email') });
    });
  },

  /**
   * Authenticate user
   */
  authenticate: function (req, res, next) {
    let userInfo;
    User.findOne({ email: req.body.email }).then(function(data) {
      userInfo = data;
      return cipherService.createToken(userInfo);
    }).then(function (token) {
      res.status(200).send({ status: 'success', message: 'User Details found', data: { user: mask(userInfo, '_id,name,email'), token: token } });
    }).catch(function(err) {
      res.status(err.statusCode).send(err); 
    });
  },
 
};