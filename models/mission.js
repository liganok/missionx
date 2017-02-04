var mongoose = require('mongoose');

var missionSchema = new mongoose.Schema({
  name: String,
  parentId: mongoose.Schema.Types.ObjectId,
  type: String,
  dueTime: Date,
  description: String,
  tags: {type:String},
  status: {type:String, default:'DRAFT'}, //[draft,active,deleted]
  isDone: { type: Boolean, default: false }
},{timestamps:true});

module.exports = mongoose.model('mission', missionSchema);