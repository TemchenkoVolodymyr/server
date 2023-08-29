const express = require("express");
const tourRouter = express.Router();

const toursFunc = require('../controllesFunctionsPizza/tourFuncs');
const authController = require('../controllesFunctionsPizza/userFuncs')
const reviewRouter = require("./ReviewRouts");


// tourRouter.param('id', toursFunc.checkID) // middleware который слушает id query param
  // Это middleware который будет срабатывать каждый раз когда у url адреса будет id.
  // Нам не надо для каждого запроса писать этот мидл . Он будет сам искать id и запускать функцию
 // в middleware функциях надо в конце использовать next() метод для того что бы передать цепочки движения вниз . Еще можно в next() передать ошибку

tourRouter.route('/top-5')
  .get( toursFunc.getTopFive,toursFunc.getTours)


tourRouter.route('/')
  // .get(authController.protect, toursFunc.getTours) // Первая функция это мидлвеа который проверяет если пользователь залогинен то пропускает к следующей функции если нет то дает ошибку
  .get( toursFunc.getTours) // Первая функция это мидлвеа который проверяет если пользователь залогинен то пропускает к следующей функции если нет то дает ошибку
  // .post(authController.protect,authController.restrictTo('admin','lead-guide'),toursFunc.createTour);
  .post(toursFunc.createTour);

tourRouter.route('/:id')
  .get(toursFunc.getTour)
  // .patch(authController.restrictTo("admin","lead-guid"),toursFunc.updateTour)
  .patch(toursFunc.updateTour)
  // .delete(authController.restrictTo("admin","lead-guid"),toursFunc.deleteTour)
  .delete(toursFunc.deleteTour)
  // .post(toursFunc.checkBody,toursFunc.createTour); // Тут работает middleware . Если проверка проходит на боди то переходим к выполнению другой функции.
// Если нет то выдаст ошибку и ничего не будет делаешь вызываеться потому что мы используем next()


tourRouter.use('/:tourId/reviews',reviewRouter);

// tourRouter.use(authController.protect);
module.exports = tourRouter;