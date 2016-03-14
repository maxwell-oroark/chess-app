/** Database setup **/
// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

var Schema = mongoose.Schema;

// game schema
var gameSchema = new Schema ({
  players : [{type: Schema.Types.ObjectId, ref: "User"}],
  created_at : {type: Date, default: Date.now},
  moves : [String],
  in_progress : { type : Boolean, default : true }

})
// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date,
  gamesPlayed : [{type: Schema.Types.ObjectId, ref:"Game" }]
});

// =====Patient Methods===== //
userSchema.pre('save', function (next) {
  // 'this' refers to the user being saved
  console.log('++++++Patient Model pre-save Running+++++++', this)
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 8)
  next()
})
// authenticate a user password
userSchema.methods.authenticate = function (password) {
  var user = this
  return bcrypt.compareSync(password, user.password)
}

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);
var Game = mongoose.model('Game', gameSchema);

// make this available to our users in our Node applications
module.exports = {
  User : User,
  Game : Game
}
