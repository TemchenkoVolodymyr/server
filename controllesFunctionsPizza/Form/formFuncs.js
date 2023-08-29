

const Form = require('../../modulesDatabasePizza/Form/formModules')
const factory = require("../HandlerFactory");




exports.getForm = factory.getAllHandler(Form);
exports.createForm = factory.createHandler(Form);
exports.deleteForm = factory.deleteHandler(Form);