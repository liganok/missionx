var mongoose = require('mongoose');

var missionSchema = new mongoose.Schema({
  name: String,
  description: String,
  isDone: { type: Boolean, default: false }
});

module.exports = mongoose.model('mission', missionSchema);