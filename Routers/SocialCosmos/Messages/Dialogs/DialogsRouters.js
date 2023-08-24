const express = require("express");

const dialogsRouter = express.Router({mergeParams: true});

const dialogsFunc = require('../../../../controlles/SocialCosmos/Messages/DialogsFunc/DialogsFunc')


dialogsRouter.route('/:chatId')
  .get(dialogsFunc.getDialogs)

dialogsRouter.route('/')
  .post(dialogsFunc.createDialog)


module.exports = dialogsRouter;