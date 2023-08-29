// const fs = require("fs");
// const jsonData = JSON.parse(fs.readFileSync('./starter/dev-data/data/tours-simple.json', 'utf-8'));

const Tour = require('../modulesDatabasePizza/tourModules');

const RequestFeatures = require('../APIFeatures/ApiFeatures');

// const catchAsync = require('../Errors/catchAsync'); // Эту функцию я создал что бы не добавлять для каждого метода try and catch . То есть
// То есть ошибки будут ловиться этой глобальной функцией для любого метода

// const ErrorHandler = require('../Errors/ErrorHandler')

const factory = require('./HandlerFactory')
const handlerFactory = require("./HandlerFactory");
const reviewSchema = require("../modulesDatabasePizza/reviewsModules");
const Users = require("../modulesDatabasePizza/userModules");
exports.getTopFive = async (req, res, next) => { // в middleware always add method next() / Этот метод после окончания работы мидлвеар передает управления на след функцию
  req.query.sort = "ratingsQuantity";
  req.query.limit = "5";
  next();
}


exports.createTour = factory.createHandler(Tour);
exports.getTours = factory.getAllHandler(Tour);
exports.getTour = factory.getOneHandler(Tour,{path:"reviews"});
exports.deleteTour = factory.deleteHandler(Tour)
exports.updateTour = factory.updateHandler(Tour)


// exports.getTours = catchAsync(async (req, res) => {
//
//   const features = new RequestFeatures(Tour.find(), req.query).filter().sort().fields().pagination();
//   let tour = await features.query
//
//   // SEND REQUEST
//   const tours = await tour
//
//   res.status(200).json({
//     status: 'Success',
//     results: tours.length,
//     data: {
//       tours
//     }
//   }) // если отправляем json файл то указываем не send а json метод
//
// });

// exports.getTour = catchAsync(async (req, res, next) => {
//
//   const param = req.params.id
//   const tour = await Tour.findById(param).populate('reviews');
// // populate
//   if (!tour) {
//     return next(new ErrorHandler('No tour found by ID',404))
//   }
//
//     res.status(200).json({
//       status: 'Success',
//       data: {
//         tour
//       }
//     })
//
// });


///////// It isn't finish;
exports.getTourStats = async (req, res) => {
  try {
    const stats = Tour.aggregate([
      {
        $match: {
          duration: {$gte: 4.5}
        },
        $group: {}
      }
    ])

  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};
// exports.checkID = (req,res,next,val) => {
//   // Это middleware который мы вешаем на параметр url адреса "id" . То есть , если id есть то эта функция будет сама автоматически вызвана в любом месте .
//   // Эту функцию не надо где то присваивать или записывать в какой то функции все что надо сделать это добавить слушателя на param(id) и все.
//   // Добавляем на прослушку в файле TourRouts.js строка 6 "tourRouter.param('id', toursFunc.checkID)"
//
// console.log(`Tour id is : ${val}`)
//   if( Number(req.params.id) > jsonData.length ){
//     res.status(404).json({
//       status:'Error',
//       message:'Invalid ID'
//     })
//   }
//   next();
// }

// exports.checkBody = (req,res,next) => { // мидлвеар который проверяет реквест боди. Если боди есть то вызвать next() который перевед нас в другую фн.
//
//  if(!req.body.price || !req.body.name) {
//    return res.status(400).json({
//      status:'Fail',
//      message:'Price or name is undefined'
//    })
//  }
//     next();
// }


//
