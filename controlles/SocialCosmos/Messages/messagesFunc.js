

const Messages = require('../../../modules/SocialCosmos/Messages/messagesModules')
const factory = require("../../../controlles/HandlerFactory");

exports.getAllMessages = factory.getAllHandler(Messages);
exports.createMessage = factory.createHandler(Messages);
exports.deleteMessage = factory.deleteHandler(Messages);