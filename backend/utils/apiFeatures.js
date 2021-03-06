export class apiFeatures {
  // creating object of apiFeatures in controller,
  constructor(query, queryStr) {
    this.query = query; // Product.find()return properties and method in object.
    this.queryStr = queryStr; // req.query return object from url
  }

  searching() {
    const searches = this.queryStr.search
      ? {
          names: {
            //regex is given by mongo to find the value, and &option i means its insensitive.. (doesn't care about capital or small letter )
            $regex: this.queryStr.search,
            $options: 'i',
          },
        }
      : {};

    console.log(searches);

    // this.query object is changed again with find method it provide.

    this.query = this.query.find({ ...searches }); // {name:{$regex: value, $options:'i'}}

    return this;
  }

  filter() {
    // make copy of req.query(all the object)
    const queryCopy = { ...this.queryStr };

    // if its between this value then eliminate them
    const removeFields = ['search', 'limit', 'page'];

    // forEach doesn't return value
    removeFields.forEach((el) => {
      delete queryCopy[el];
    });

    // Advanced filter for price, rating etc.

    // converting object into JSON string.
    let queryStr = JSON.stringify(queryCopy);

    // adding $ sign in string so that again when we find it in database

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    //we change it to object.
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(limit) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = limit * (currentPage - 1);

    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
}
