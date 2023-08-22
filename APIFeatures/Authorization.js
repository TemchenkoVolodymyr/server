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
    confirmPassword:req.body.confirmPassword,
    date:req.body.date,
    isOnline:req.body.isOnline
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

exports.editUser = catchAsync(async (req,res,next) => {
  const doc = await Social.findByIdAndUpdate(req.params.id,req.body,{
    new:true,runValidators:true
  })
  if(!doc) {
    return next(new AppError('No document found by id to update', 400))
  }

  res.status(200).json({
    status:'Success',
    data:{
      data:doc
    }
  })
})

exports.getAllUsers = catchAsync(async (req,res,next) => {

  const documents = Social.find()

  if(!documents){
    next(new AppError("No documents",400))
  }
  let doc = await documents.query

  const result = await doc

  res.status(200).json({
    status:"Success",
    results:result.length,
    data:{
      result
    }
  })
})