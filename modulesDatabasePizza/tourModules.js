const mongoose = require('mongoose')

const User = require('./userModules')

// SCHEMA  это схема по которой мы можем создавать новые обьекты в базе данных
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], // поле имя обязательное , если его не будет то выдаст ошибки которая указана вторым аргументтом
    unique: true, // имя не может повторятся
    trim: true // убирает пробелы до слова и после слова (    VOVA     ) Уберет эти пробелы
  },
  ratingAverage: {
    type: Number,
    default: 4.5 // если поля rating не будет то он автоматически создаст его со значением 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 7
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"]
  },
  duration: {
    type: Number,
    required: [true, "The tour must have a duration"]
  },
  countOfStops: {
    type: Number,
    default: 4
  },
  summary: {
    type: String,
    required: [true, "The tour must have a place of event"]
  },
  description: {
    type: String,
    default: 'Fresh place between the sea and the forest'
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'The tour must have a countOfGroup']
  },
  imageCover: {
    type: String,
    required: [true, "The tour must have a cover image"]
  },
  images: [String], // Массив который содержит строки
  createdAt: {
    type: Date,
    default: Date.now(),
    //select:false // Если указать false то это значение не будет видно при запросе
  },
  startDates: [],
  difficulty: {
    type: String,
    default: "Easy",
  },
  startLocation: {
    type: {
      type: String,
      default: "Point",
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"]
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    }
  ],
  // guides: Array,
guides:[
  {
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }
],

}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});


// DOCUMENT MIDDLEWARE : runs before save() and create()
// tourSchema.pre('save', function (){
//
//   console.log(this)
// })

tourSchema.pre("save", async function (next) {
console.log(this.guides)
  const guidesPromises = this.guides.map(async id => await User.findById(id))


  this.guides = await Promise.all(guidesPromises)
  next();
})

// Virtual populate
tourSchema.virtual('reviews',{
  ref:'Reviews',
  foreignField:'refToTour',
  localField:'_id'
});

//  8 Урок от 103 по 109 я не смотрел видео .

// Тут все происходит по принципу Class  in JAVASCRIPT
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;