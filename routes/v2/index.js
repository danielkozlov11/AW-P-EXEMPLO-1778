const router = require("express").Router(); // import express router
const studentRouter = require("././students"); // import student router
const schoolRouter = require("././schools"); // import school router
const courseRouter = require("././courses"); // import course router

router.use("/schools", schoolRouter); // register school router
router.use("/students", studentRouter); // register student router
router.use("/courses", courseRouter); // register course router

module.exports = router;
