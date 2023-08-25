const express = require("express");

const messageRouter = express.Router({mergeParams: true});

const messageFunc = require('../../../controlles/SocialCosmos/Messages/messagesFunc')

messageRouter.route('/')
  .post(messageFunc.createChat)

messageRouter.route('/:userId')
  .get(messageFunc.findUserChats)

messageRouter.route('/find/:firstId/:secondId')
  .get(messageFunc.findChat)

messageRouter.route('/findAllChats/:firstId/:secondId')
  .get(messageFunc.findCurrentUserChats)

module.exports = messageRouter;