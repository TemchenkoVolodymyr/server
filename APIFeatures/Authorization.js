const jwt = require('jsonwebtoken');
const Social = require('../modules/SocialCosmos/socialModules')

const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user,statusCode,res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly:true
  };

  res.cookie('jwt', token,cookieOptions)

  user.password = undefined;

  res.status(statusCode).json({
    status:"success",
    token,
    data:{
      user
    }
  })
}

exports.signup = async (req,res) => {
  const newUser = await Social.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm
  })

  createSendToken(newUser,201,res)
}