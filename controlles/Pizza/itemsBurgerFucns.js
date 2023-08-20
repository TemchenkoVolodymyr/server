

// const Burgers = require('../../modulesDatabase/Pizza/itemsBurgerModules')
const Burgers = require('../../modules/Pizza/itemsBurgerModules')
const factory = require("../HandlerFactory");



exports.getAllBurgers = factory.getAllHandler(Burgers);
exports.createBurger = factory.createHandler(Burgers);
exports.deleteBurger = factory.deleteHandler(Burgers);