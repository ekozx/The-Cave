var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

userSchema.methods.validPassword = function(pwd) {
  return (this.password === pwd);
}

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
