const MessageDAO = require('../daos/MessageDAO.js')

class MessageController {

  static async authenticateUser(req, res, next) {
    const user = req.body.userData
    jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h'}, (err, token) => {
      if (err) {
        res.status(400).json("Unable to authenticate user")
      } else {
        res.status(200).json({
          message: 'User Authenticated',
          token
        })
      }
    })
  }

  static async getMessages(req, res, next) {
    try {
      const _id = req.params._id
      const messages = await MessageDAO.getMessages(_id)
      res.json(messages)
    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
      }
    }

  static async addMessage(req, res, next) {
    try {
      const _id = req.body._id
      const type = req.body.type
      const message = req.body.message
      const response = await MessageDAO.addMessage(_id, message, type)
      res.json(response)
    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }

  static async deleteMessage(req, res, next) {
    try {
      const _id = req.params._id 
      const message = req.body.message
      const response = MessageDAO.updateOne(_id, message)
      res.json(response)
    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }

}

module.exports = MessageController
