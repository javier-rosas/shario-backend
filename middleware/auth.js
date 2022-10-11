const jwt = require("jsonwebtoken")

const checkUser = () => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader
    try {

    } catch(e) {

    }
  }
}

module.exports = {
  checkUser
}
