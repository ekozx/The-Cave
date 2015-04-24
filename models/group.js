var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);
