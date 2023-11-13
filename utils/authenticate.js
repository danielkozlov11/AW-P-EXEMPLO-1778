const jwt = require("jsonwebtoken"); // import jsonwebtoken
const secret = process.env.JWT_SECRET; // import secret from .env

exports.generateAcessToken = (information) =>
  jwt.sign(information, secret, { expiresIn: "7d" }); // generate access token with 7 days expiration

exports.CertifyAcessToken = (token) => {
  // verify token
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
