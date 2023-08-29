

const Pizza = require('../../modulesDatabasePizza/Pizza/itemsPizzaModules')
const factory = require("../HandlerFactory");



exports.getAllPizzas = factory.getAllHandler(Pizza);
exports.createPizza = factory.createHandler(Pizza);
exports.deletePizza = factory.deleteHandler(Pizza);