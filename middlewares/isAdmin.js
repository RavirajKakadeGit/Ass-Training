var _ = require('lodash');

var jwtConfig = require('../config/config').jwtSettings;
var cipherService = require('../services/cipher');

module.exports = function (req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization']; 
  if (!_.isEmpty(token) && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    cipherService.verifyToken(token, function(err, decoded) {
      if (err) {
        res.status(401).send({
          success: false,
          message: 'Token is not valid'
        });
        return res.json();
      } else if (decoded.user.type !== 'admin') {
        res.status(403).send({
          success: false,
          message: 'Sorry, Only admin user allowed'
        }); 
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    }); 
  }
};