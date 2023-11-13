const authenticateUtil = require("../utils/authenticate"); // import authenticate util

module.exports = async (req, res, next) => {
  // export middleware function with req, res, next parameters
  const acessToken = req.headers["authorization"]; // get authorization header from request
  if (!acessToken) {
    return res.status(401).json({
      // if authorization header is not found, return 401 unauthorized
      message: "Unauthorized",
    });
  } else {
    try {
      const bearer = acessToken.split(" "); // split authorization header by space
      console.log("++++++++++++++++++++++++++++++", bearer);
      const bearerToken = bearer[1]; // get token from splitted header

      const result = await authenticateUtil.CertifyAcessToken(bearerToken); // verify token
      req.body.loggedUserName = result.Name;

      return next(); // if token is valid, call next middleware
    } catch (err) {
      return res.status(401).send("unauthorized");
    }
  }
};
