const Users = require('../modulesDatabasePizza/userModules');
const catchAsync = require("../APIFeatures/catchAsync");
const jwt = require('jsonwebtoken');
// npm i jsonwebtoken для того что бы получать токен пользователя при регистрации
const ErrorHandler = require('../APIFeatures/ErrorHandler');
const {promisify} = require('util');
const crypto = require('crypto');

const tokenUtility = require('../utilityPizza/CreateToken');

const sendEmail = require('../utilityPizza/email')


const factory = require('./HandlerFactory')
const handlerFactory = require("./HandlerFactory");
const Tour = require("../modulesDatabasePizza/tourModules");
const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj;
}

// exports.getUsers = catchAsync(async (req, res) => {
//   const users = await Users.find();
//
//   res.status(200).json({
//     status: 'success',
//     result: users.length,
//     data: {
//       users
//     }
//   })
// });

exports.getUsers = factory.getAllHandler(Users);
exports.getUser = factory.getOneHandler(Users);
// exports.getUser = (req, res) => {
//   res.status(500).json({
//     status: 'Ops',
//     message: 'Ulr address is wrong'
//   })
// }
// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'Ops',
//     message: 'Ulr address is wrong'
//   })
// }

exports.createUser = catchAsync(async (req, res) => {

  const newUser = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  }); // метод create создает запись в датабейс.


  // TOKEN // Нужен для того что бы при регистрации пользователя ему присваивался свой персональный токен по которому он будет заходить на сайт
  // const token = signToken(newUser._id)
  // res.status(200).json({
  //   status: 'success',
  //   token: token,
  //   data: {
  //     user: newUser
  //   }
  // });
  tokenUtility.createToken(newUser._id, 200, newUser, res)
});


// LOGIN и проверка пароля с помощю bcrypt.compare(candidatePassword,userPassword); Эту функцию мы создаем в файле userModules и подключаем к userSchema на строчке 66

exports.login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400)) // Всегда используем return что бы быть увереным что функция завершится в случаее ошибки
  }

  const user = await Users.findOne({email});

  if (!user || !(await user.correctPassword(password, user.password))) {
    // метод correctPassword мы создали в файле userModels и подключили к scheme / user это и есть наша схема которая импортиться
    // if (!user || !(await user.correctPassword(password,'$2b$12$D0fIEsKaLwdKx7qXnEMUH.E7ytdBWIvpbzrQAiSYDqtpnvqwCWFYC'))) { // метод correctPassword мы создали в файле userModels и подключили к scheme / user это и есть наша схема которая импортиться
      return next(new ErrorHandler("Incorrect Email or Password", 401));
  }

  tokenUtility.createToken(user._id, 200, user, res)
  next()
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { // Сервер всегда передает токен в виде строки которая начинается с "Bearer"
    token = req.headers.authorization.split(' ')[1]; // наш токен находиться в headers.authorization по этому разбиваем строку на массив и получаем второй элемент массива ( наш токен без Bearer)"
  }

  if (!token) { // Если токена нету то запускаем ошибку с помощю функции которую мы создали сами
    return next(new ErrorHandler("Your arent logged in! Please log in get access", 401))
  }
  // 2) Validate/Verification token

  const decoded = await promisify(jwt.verify)(token, "i-shoud-create-my-extra-long-secret");

  // CHECK USER
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(
      new ErrorHandler(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new ErrorHandler('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("You do not have permission this action", 400))
    }

    next();
  }
};

// change password page

exports.forgotPassword = catchAsync(async (req, res, next) => {
// 1) get user based
  const user = await Users.findOne({email: req.body.email})
  if (!user) return next(new ErrorHandler("There is no user with email address", 404))

// 2) generate random token
  const resetToken = user.createPasswordResetToken();

  await user.save({validateBeforeSave: false});
  // 3) send it back to user

  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`

  const message = `Forgot your password? Submit a PATCH request with your new password to ${resetURL}.\n If you didnt forget your password , please ignore this email`
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token",
      message
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({validateBeforeSave: false});
    return next(new ErrorHandler("There was an error sending the email.Try again later", 500))
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on the token

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Users.findOne({
    // passwordResetToken: hashedToken,
    // passwordResetExpires: {
    //   $gt: Date.now()
    // }
    email:req.body.email
  }).select("+password") ;

  // 2) If token has no expired and there is user , set the new pass
  if (!user) {
    return next(new ErrorHandler("Token is invalid or has expired", 400))
  }
  if(user || (await user.correctPassword(user.password, req.body.previousPassword))){
    console.log('wwwww')
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();


  }


  tokenUtility.createToken(user._id, 200, null, res)

});


/// UPDATE PASS
exports.updatePassword = catchAsync(async (req, res, next) => {
  //1 ) Get user from collection
console.log(req)
  const user = await Users.findById(req.user.id).select("+password") // Тут методом select добавляем поле password к нашему юзеру потому что мы это поле удаляем для безопасности

  const currentPassword = user.password;
  const confirmPassword = req.body.passwordCurrent;

  //2 ) Check if Posted password is correct
  if (user || (await user.correctPassword(confirmPassword, currentPassword))) { // тут у нашей schema мы находим метод который создали для проверки пароля с помощю hash
    //3 ) Update the password
    user.password = confirmPassword
    user.passwordConfirm = confirmPassword
    await user.save(); // Если не прописать это метод то ничего не сохранится
  } else {
    next(new ErrorHandler("Your current password is incorrect", 401))
  }

  tokenUtility.createToken(user._id, 200, null, res)
});


exports.updateMe = factory.updateHandler(Users)


exports.deleteMe = factory.deleteHandler(Users)


