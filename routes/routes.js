const express = require('express')
const UserController = require('../controllers/UserController.js');
const { checkUserValidity } = require("../middleware/auth.middleware");
const router = express.Router()

router.post("/authenticate", UserController.authenticateUser)
router.get("/:userToken", checkUserValidity, UserController.getMessages)
router.put("/messages", checkUserValidity, UserController.addMessage)
router.delete("/todo/:userToken/:message", checkUserValidity, UserController.deleteMessage)


module.exports = router
