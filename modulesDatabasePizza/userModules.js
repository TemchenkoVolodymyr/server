const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The user must have a name"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "The user must have a email"],
    uniq: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please a valid Email"]
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guid", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "The user must have a password"],
    trim: true,
    minlength: 8,

  },
  passwordConfirm: {
    type: String,
    required: [true, "Input password confirm must be fill"],
    trim: true,
    // Что бы добавить свою валидацию записываем вот так :
    validate: {
      // Эта валидация для сравнения password and passwordConfirm/ Если результат данной функции будет false то мы получим ошибку
      validator: function (el) { // используем только такой вид функции потому что мы
        // будем использовать /this/ Это работает только что мы хотим сохранить данные
        return el === this.password;
      },
      message: "Passwords are not the same"
    }
  },
  photo: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  aboutMe:String,
  hobbies:String,
  previousPass:String
})

// method "pre" дает возможность позволяет определить функцию middleware которая будет работать между запросами . То есть когда нам надо перед сохранением данных в базу данных
// что то сделать с данными то мы использьуем вот этот метод как в нашем примере я использовал функцию в которую передаю next параметр для того что бы после окончания
// работы код мог дальше идти по цепочке
userSchema.pre('save', async function (next) {

  const lengthHash = 12;
  if (!this.isModified('password')) {  // this.isModified проверяет был ли изменной пароль или нет

    return next();
  } else {
// Если пароль был изменной или перезаписан на страрый то мы шифруем этот пароль перед отправкой на базу данных
    this.password = await bcrypt.hash(this.password, lengthHash);  // bcrypt это npm install bcrypt

    this.passwordConfirm = undefined; // когда зашифровали наш пароль то поле подверждения пароль обнуляем

    // И конечно что же в конце вызываем next ()
    next();
  }
})
userSchema.pre("save", function (next) {
  console.log('mod')
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});



userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log('Asdsadasdasd')
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({resetToken}, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}


// middleware query Для того что бы получить юзеров только у которых поле актив true
userSchema.pre(/^find/,function (next) {

  this.find({active : {$ne:false}});  // $ne ---- это как в js оператор ! (не)
  next();
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;


