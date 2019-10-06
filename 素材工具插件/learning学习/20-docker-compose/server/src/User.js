const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: String
})

const User = mongoose.model('user', UserSchema)

module.exports = {
  User
}
