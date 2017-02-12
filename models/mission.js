let mongoose = require('mongoose');

let missionSchema = new mongoose.Schema({
  name: String,
  parentId: mongoose.Schema.Types.ObjectId,
  type: String,
  dueTime: Date,
  description: String,
  tags: {type:String},
  status: {type:String, default:'A'}, //[active:A,deleted:D]
  isDone: { type: Boolean, default: false }
},{timestamps:true});

module.exports = mongoose.model('mission', missionSchema);