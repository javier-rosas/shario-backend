const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
  _id: { type: String, required: [true, "Please check your data entry, no _id specified."]},
})

const User = mongoose.model('User', userSchema)
module.exports = User