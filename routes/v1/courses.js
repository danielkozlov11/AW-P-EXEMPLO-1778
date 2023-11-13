const courseRouter = require('express').Router();
const controller = require('../../controllers/v1/course');

//students CRUD
courseRouter.get('/', controller.getAll); //read all
courseRouter.get('/:id', controller.getById); //read one by his id (school number)
courseRouter.post('/create', controller.create); //create new school
courseRouter.put('/update', controller.update); //update school
courseRouter.delete('/delete/:id', controller.delete); //delete school

module.exports = courseRouter;