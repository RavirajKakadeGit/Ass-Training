var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var baseSchema = new Schema({
  name: {
    type: String,
    unique:true,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Basic', 'Detailed' ]
  },
  subjects:  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    }
  ],
  lastModified: {
    type: String,
    required: false
  }
});

mongoose.model('Training', new mongoose.Schema(baseSchema,
  { collection: 'Training', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
));