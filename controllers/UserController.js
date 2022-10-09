const User = require('../schema/userSchema.js')
const Message = require('../schema/messageSchema.js')


class UserController {

  static async authenticateUser(req, res, next) {
    const user = req.body.userData;
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
      const token = req.params.token
      // put these two lines into dao
      const query = { token: token }
      const projection = { messages: 1 }

      User.find(query, projection)
        .then( result => res.json(result))
        .catch( () => res.json(res.status(404).json({ error: "Todos not found" })))

    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }

  static async addMessage(req, res, next) {
    try {
      const token = req.body.token
      const message = req.body.message
      // put these two lines into dao
      const query = { token : token }
      const update = { 
        $set:  { email: email },
        $push: { messages: message }
      }
      const options = { upsert : true }
      Todo.updateOne(query, update, options, (err, data) => {
        if (err) {
          res.status(500).json({ error: "Unable to update user" })
          console.log(err)
        } else {
          res.json({ status: "success" })
        }
      })
    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }

  static async deleteMessage(req, res, next) {
    try {
      const email = req.params.email 
      const todo = req.params.todo
      const query = { email: email }
      const update = { $pullAll: { todos: [todo] } }

      Todo.updateOne(query, update, (err, data) => {
        if (err) {
          res.status(500).json({ error: "Unable to update user" })
          console.log(err)
        } else {
          res.json({ status: "success" })
        }
      })
    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }

}

module.exports = UserController
