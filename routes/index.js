const router = require('express').Router();
const studentRouter = require('./students');
const schoolRouter = require('./schools');

router.use('/schools', schoolRouter);
router.use('/students', studentRouter);

module.exports = router;