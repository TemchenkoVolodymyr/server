const express = require("express");

const userRouter = express.Router();

const userFunc = require('./../controllesFunctionsPizza/userFuncs');





userRouter.route('/login')
  .post(userFunc.login)
userRouter.route('/forgotPassword')
  .post(userFunc.forgotPassword)

// userRouter.use(userFunc.protect); // Добавляет этот мидлвеар для всех request методов которые идет снизу этого кода

userRouter.route('/resetPassword/:token')
  .patch(userFunc.resetPassword)   // Изменить пароль через профиль
userRouter.route('/updatePassword')
  .patch(userFunc.updatePassword);
// userRouter.route('/updateMe')
//   .patch(userFunc.protect, userFunc.updateMe);

// userRouter.use(userFunc.restrictTo('admin'));

userRouter.route('/')
  .get(userFunc.getUsers).post(userFunc.createUser);

userRouter.route('/:id')
  .delete(userFunc.deleteMe)
  .patch(userFunc.updateMe)
  .get(userFunc.getUser);





module.exports = userRouter;