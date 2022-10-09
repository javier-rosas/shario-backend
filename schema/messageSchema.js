const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema ({
  token: { type: String, required: [true, "Please check your data entry, no token specified."]},
  message: { type: String, required: [true, "Please check your data entry, no message specified."]}
}, {_id : false})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message