'use strict';
var mask = require('json-mask');
var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken');

var jwtSettings = require('../config/config').jwtSettings;

module.exports = {
  
  /**
  * Create a token based on the passed user
  *
  * @param  {Object}   user user details
  * @param  {Function} cb   callback
  * @return {Function}
  */
  createToken: function (user) {
    
    return jwt.sign(
      { user: mask(user, '_id,type,email') },
      jwtSettings.secret,
      {
        algorithm: jwtSettings.algorithm,
        expiresIn: jwtSettings.expiresIn,
        issuer: jwtSettings.issuer,
        audience: jwtSettings.audience
      }
    );
  },

  /**
  * To verify a token
  *
  * @param  {string}   token
  * @param  {Function} cb    callback
  * @return {Function}
  */
  verifyToken: function (token, cb) {
    var jwtOptions = {
      algorithm: jwtSettings.algorithm,
      expiresIn: jwtSettings.expiresIn,
      issuer: jwtSettings.issuer,
      audience: jwtSettings.audience,
      ignoreExpiration: jwtSettings.ignoreExpiration
    };

    jwt.verify(token, jwtSettings.secret, jwtOptions, function (err, decoded) {
      if (err) {
        return cb(err);
      } else {
        return cb(null, decoded);
      }
    });
  }
};
