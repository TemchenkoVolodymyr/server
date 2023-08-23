class RequestFeatures {
  constructor(query, queryString) {
    this.query = query // Тут мы получаем Tour
    this.queryString = queryString // тут получаем req.query
  }


  filter() {

    const queryObj = {...this.queryString};
    const uniqWords = ["page", "sort", "limit", "fields"]; // Список который мне надо удалить из req.query .
    uniqWords.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr))

    return this;
  }

  sort() {

    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort)
    } else {
      this.query = this.query.sort("-createdAt") // Значение по дефолту ( Если сорт будет пустой то мы отсортирвем по дате добавления)
    }
    return this
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(" ");
      this.query = this.query.select(fields);  // Select выбирает только те значение который указаны в fields >>
      // << Если поставить - (минус) то наоборот, он не будет указывать те значения
    } else {
      this.query = this.query.select("-__v");
    }
    return this
  }

  pagination() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit // Это нужно для того что бы перепрыгнуть на то количество постов которое мне надо (2 - 1) * 10 = я покажу посты начиная с 11

    this.query = this.query.skip(skip).limit(limit);

    // Эта часть кода отвечает за то что если пользователь ввел несуществующее количество страницы то мы выдадим ошибку
    if (this.queryString.page) {
      const numTours = this.query.countDocuments();  // countDocuments() возвращает длину нашей базыданых
      if (skip > numTours) {
        throw new Error("This page doesnt exist");
      }
    }
    return this
  }
}

module.exports = RequestFeatures