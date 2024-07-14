const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

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
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function verifyJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
}

module.exports = {
  Response,
  PaginateResponse,
  verifyJWT
};
