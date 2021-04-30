var user = require('../controllers/user.controller');

module.exports = function (app) {

  app.route('/api/v1/user/signup')
    .post(user.register);

  app.route('/api/v1/user/login')
    .post(user.authenticate);

};