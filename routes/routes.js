const express = require('express')
const MessageController = require('../controllers/MessageController.js');
const { checkUserValidity } = require("../middleware/auth.middleware");
const router = express.Router()

router.post("/authenticate", MessageController.authenticateUser)
router.get("/:userToken", checkUserValidity, MessageController.getMessages)
router.put("/messages", checkUserValidity, MessageController.addMessage)
router.delete("/todo/:userToken/:message", checkUserValidity, MessageController.deleteMessage)


module.exports = router
