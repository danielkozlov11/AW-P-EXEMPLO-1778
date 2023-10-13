const fs = require('fs'); //file system module

exports.create = async (req, res) => {
    //get requested course properties
    const {id, name, sigla, school} = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //add to course array
    data.courses.push(req.body);
    //add to course array
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new course
    return res.status(201).send(req.body);
}

//updates course
exports.update = async (req, res) => {
    const { id, name, sigla, school } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find school to update
    const course = data.courses.find(course => course.id == id);
    //update properties
    course.name = name;
    course.sigla = sigla;
    course.school = school;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated student
    return res.send({id, name, sigla, school });
}

//delete course by his id (course number)
exports.delete = async (req, res) => {
    //get school id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //find course to delete
    const course = data.courses.filter(course => course.id == id);
    //delete course
    data.courses.splice(course, 1);
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}

//return all courses
exports.getAll = async (req, res) => {
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //returns course array
    return res.send(data.courses);
}

//return course by his id (course number)
exports.getById = async (req, res) => {
    //get course id requested
    const id = req.params.id;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //finds course by his id
    const course = data.courses.filter(course => course.id == id);
    //return courses
    res.send(course);
}