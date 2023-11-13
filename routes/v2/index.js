const router = require('express').Router();
const studentRouter = require('././students');
const schoolRouter = require('././schools');
const courseRouter = require('././courses');

router.use('/schools', schoolRouter);
router.use('/students', studentRouter);
router.use('/courses', courseRouter);

module.exports = router;