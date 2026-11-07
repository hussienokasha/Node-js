export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    
    const excludedFields = ["fields", "sort", "page", "limit"];
    let queryObj = { ...this.queryString };


    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    queryObj = JSON.parse(queryStr);

    this.query = this.query.find(queryObj);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }
  paginate() {
    const page = Number(this.queryString.page) || 1;

    const limit = Number(this.queryString.limit) || 5;

    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}
