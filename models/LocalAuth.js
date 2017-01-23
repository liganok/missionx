var mongoose = require('mongoose');

var LocalAuthSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  password: String,
});

module.exports = mongoose.model('LocalAuth', LocalAuthSchema);