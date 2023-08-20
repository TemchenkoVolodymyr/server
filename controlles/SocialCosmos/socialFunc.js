

const Social = require('../../modules/SocialCosmos/socialModules')
const factory = require("../HandlerFactory");



exports.getAllSocial = factory.getAllHandler(Social);
exports.createSocial = factory.createHandler(Social);
exports.deleteSocial = factory.deleteHandler(Social);