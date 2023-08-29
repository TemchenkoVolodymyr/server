

const Drinks = require('../../modulesDatabasePizza/Pizza/itemsDrinkModules')
const factory = require("../HandlerFactory");



exports.getAllDrinks = factory.getAllHandler(Drinks);
exports.createDrink = factory.createHandler(Drinks);
exports.deleteDrink = factory.deleteHandler(Drinks);