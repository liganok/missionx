var mongoose = require('mongoose');

var OAuthSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  oauthType: String,
  oauthId: String,
  oauthAccessToken: String,
  oauthExpires: Date,
});

module.exports = mongoose.model('OAuth', OAuthSchema);