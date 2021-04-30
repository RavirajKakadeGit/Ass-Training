var mask = require('json-mask');
var mongoose = require('mongoose');
var fs = require('fs');
var Subject = mongoose.model('Subject');

module.exports = {

  /**
   * Save subject
   */
  saveSubject: function (req, res, next) {
    var subject = new Subject();
    subject.name = req.body.name;
    subject.stream = req.body.stream;
    subject.lastModified = req.decoded.user.email;
    subject.save().then(function(data) {
      res.status(201).send({ status: 'success', message: 'Subject details added' });
    }).catch(function(err) {
      err.statusCode = 500;
      err.msg = 'Server Error';
      if (err.code === 11000) {
        err.msg = 'Record already exits';
        err.statusCode = 409;
      }
      res.status(err.statusCode).send(err); 
    });
  },
 
  getAllSubject: async function  (req, res, next) {
    let limit = req.query.limit ? req.query.limit : 10;
    let skip = req.query.skip ? req.query.skip : 0;
    let order = -1; 
    if (req.asc) {
      order = 1;
    }
    Subject.aggregate( [
      {
        '$match':  {}
      },
      { '$sort'     : { 'name' : order } },
      {
        '$facet': {
          'metadata': [
            {
              '$count': 'total'
            }, {
              '$addFields': {
                'page': 1
              }
            }
          ], 
          'result': [
            {
              '$skip': skip
            }, {
              '$limit': limit
            }
          ]
        }
      }, {
        '$unwind': {
          'path': '$metadata', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$project': { 
          'docs': '$result', 
          'totalDocs': '$metadata.total', 
          'currentDocs': {
            '$size': '$result'
          }, 
          'limit': {
            '$literal': limit
          }, 
          'page': {
            '$literal': ((skip / limit) + 1)
          }, 
          'pages': {
            '$ceil': {
              '$divide': [
                '$metadata.total', limit
              ]
            }
          }
        }
      }]).then(function(data) {
        res.status(200).send({ status: 'success', message: 'Successfully retrieved subjects',data: data && data[0].docs });
      }).catch(function(err) {
        res.status(err.statusCode).send(err); 
      });;
    }
}