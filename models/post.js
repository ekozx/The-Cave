var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  picture: String,
  title: String,
  hasGroup: Boolean,
  groupId: String,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);
