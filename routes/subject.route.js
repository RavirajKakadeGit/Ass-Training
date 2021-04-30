var subject = require('../controllers/subject.controller');

var isView = require('../middlewares/isView');
var isAdmin = require('../middlewares/isAdmin');

module.exports = function (app) {

  app.route('/api/v1/subject')
    .post(isAdmin, subject.saveSubject);

  app.route('/api/v1/subject')
  .get(isView, subject.getAllSubject);
 
};