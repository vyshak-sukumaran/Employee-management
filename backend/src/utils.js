
class Response {
  constructor(status, data, message) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

class PaginateResponse extends Response {
  constructor(status, data, message, total, limit, offset, page, totalPages) {
    super(status, data, message);
    this.total = total;
    this.limit = limit;
    this.offset = offset;
    this.page = page;
    this.totalPages = totalPages;
  }
}

module.exports = {
  Response,
  PaginateResponse
};
