const jwt = require('jsonwebtoken');

const { findUser } = require('../repository/UserRepository');
const { customErrorLogger } = require('./ErrorHandleHelper');

exports.authenticateJWT = function () {
  return function (req, res, next) {
    const secretOrKey = process.env.JWT_SECRET_KEY;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secretOrKey, async (err, jwtPayload) => {
        if (err) {
          customErrorLogger(err);
          return res.sendStatus(401);
        }
        if (jwtPayload && jwtPayload.id) {
          const existingUser = await findUser({
            _id: jwtPayload.id,
          });
          if (existingUser) {
            req.authenticated = true;
            req.user = existingUser;
            next();
          } else {
            return res.sendStatus(403);
          }
        } else {
          return res.sendStatus(403);
        }
      });
    } else {
      console.log('here');
      return res.sendStatus(401);
    }
  };
};
