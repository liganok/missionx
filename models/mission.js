var mongoose = require('mongoose');

var missionSchema = new mongoose.Schema({
  name: String,
  parentId: String,
  createTime: Date,
  updateTime: Date,
  dueTime: Date,
  description: String,
  tags: {type:String},
  isDone: { type: Boolean, default: false }
});

module.exports = mongoose.model('mission', missionSchema);