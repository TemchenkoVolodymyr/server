const jwt = require('jsonwebtoken');
const Social = require('../modules/SocialCosmos/socialModules')
const AppError = require('../APIFeatures/appError')
const catchAsync = require("./catchAsync");
const signToken = (id) => {
  return jwt.sign({id},"my-ultra-secure-and-ultra-long-secret",{
    expiresIn:"90d"
  })
}

const createSendToken = (user,statusCode,res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000
    ),
    httpOnly:true
  };

  res.cookie('jwt', token,cookieOptions)

  // user.password = undefined;

  res.status(statusCode).json({
    status:"success",
    token,
    data:{
      user:user
    }
  })
}

exports.signup = catchAsync(async (req,res,next) => {

  console.log(req.body)

  const newUser = await Social.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
    date:req.body.date
  })

  createSendToken(newUser,201,res)
})

exports.login = catchAsync(async (req,res,next) => {
  const {email , password} = req.body;

  if(!email || !password) {
    return next(new AppError('Please provide email and password',400))
  }
  const user = await Social.findOne({email})

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, res);
  next()
})