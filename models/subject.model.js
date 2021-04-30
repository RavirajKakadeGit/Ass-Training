var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var baseSchema = new Schema({
  name: {
    type: String,
    unique:true,
    required: true
  },
  stream: {
    type: String,
    required: true,
    enum: ['Science', 'Arts', 'Commerce' ]
  },
  lastModified: {
    type: String,
    required: false
  }
});


mongoose.model('Subject', new mongoose.Schema(baseSchema,
  { collection: 'Subject', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
));