var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  missionId: { type: String, unique: true, index: true },
  name: String,
  description: String,
  status: { type: Boolean, default: false }
});

module.exports = mongoose.model('mission', missionSchema);