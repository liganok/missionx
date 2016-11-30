var mongoose = require('mongoose');

var missionSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: Boolean, default: false }
});

module.exports = mongoose.model('mission', missionSchema);