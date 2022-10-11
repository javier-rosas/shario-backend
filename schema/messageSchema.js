const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema ({
  _id: { type: String, required: [true, "Please check your data entry, no userId specified."]},
  messages: [{
    message: { type: String, required: [true, "Please check your data entry, no message specified."]},
    type: { type: String, required: [true, "Please check your data entry, no type specified."]},
  }]
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message