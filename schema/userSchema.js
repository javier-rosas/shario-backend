const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
  token: { type: String, required: [true, "Please check your data entry, no token specified."]},
}, {_id : false})

const User = mongoose.model('User', userSchema)
module.exports = User