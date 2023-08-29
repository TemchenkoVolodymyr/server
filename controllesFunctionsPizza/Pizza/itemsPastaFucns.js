

const Pastas = require('../../modulesDatabasePizza/Pizza/itemsPastaModules')
const factory = require("../HandlerFactory");



exports.getAllPastas = factory.getAllHandler(Pastas);
exports.createPasta = factory.createHandler(Pastas);
exports.deletePasta = factory.deleteHandler(Pastas);