//refer to http://www.liaoxuefeng.com/article/001437480923144e567335658cc4015b38a595bb006aa51000
var mongoose = require('mongoose');

var UserFileSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  birth: Date,
  registerTime: Date,
  registerChannel: String,
});

module.exports = mongoose.model('UserFile', UserFileSchema);