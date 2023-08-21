
const catchAsync = fn => {
  // Тут происходит на подобии асинхрон диспатч в реакте
  return (req,res,next) => { // То что мы передали во время return то и получает внутри функция
    fn(req,res,next).catch(next);
  }
}

module.exports = catchAsync;