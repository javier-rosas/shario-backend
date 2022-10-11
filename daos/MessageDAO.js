const Message = require('../schema/messageSchema.js')

class MessageDAO {

  static async getMessages(_id) {
    try {
      return await Message.find({ _id: _id })
    } catch(e) {
      console.log(e)
      return e
    }
  }

  static async addMessage(_id, message, type) {
    try {
      return await Message.findByIdAndUpdate(
        {_id: _id}, 
        { $push: { messages: { message, type } } })
    } catch(e) {
      console.log(e)
      return e
    }
  }

  static async deleteMessage(_id, message) {
    try {
      return await Message.findByIdAndUpdate(
        { _id: _id },
        { $pull: { messages: { message } } }, 
        { safe: true, multi: false })
    } catch(e) {
      console.log(e)
      return e
    }
  }
}

module.exports = MessageDAO
