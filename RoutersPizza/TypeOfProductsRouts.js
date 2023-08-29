// const express = require("express");
//
// const typeOfProductRouter = express.Router({mergeParams: true});
// // mergeParam - дает возможность получать id с другого роута(TourRouts)
//
// const typeOfProductFunc = require('../controllesFunctionsPizza/Pizza/pizzaFuncs')
//
//
//
// typeOfProductRouter.route('/')
//   .post(typeOfProductFunc.createProduct)
// .get(typeOfProductFunc.getAllProducts)
//
//
// typeOfProductRouter.route('/:id')
//   // .get(typeOfProductFunc.getAllProducts)
//   .delete(typeOfProductFunc.deleteProduct)
//
//
//
// module.exports = typeOfProductRouter;