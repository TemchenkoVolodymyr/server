const express = require("express");

const messageRouter = express.Router({mergeParams: true});

const messageFunc = require('../../../controlles/SocialCosmos/Messages/messagesFunc')

messageRouter.route('/')
  .get(messageFunc.getAllMessages)
  .post(messageFunc.createMessage)



module.exports = messageRouter;