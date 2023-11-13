const authRouter = require("express").Router(); // import express router
const controller = require("../../controllers/v2/auth"); // import controller for auth

authRouter.post("/signin", controller.signin); // register route
authRouter.post("/signup", controller.signup); // login route

module.exports = authRouter; // export auth router
