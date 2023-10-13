const fs = require('fs');
//creates school
exports.create = async (req, res) => {
    //get requested student properties
    const {id, name, sigla, morada,website } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //add to students array
    data.schools.push(req.body);
    //add to students array
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return new student
    return res.status(201).send(req.body);
}

//updates school
exports.update = async (req, res) => {
    const { id, name, sigla, morada, website } = req.body;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse to json
    const data = JSON.parse(datajson);
    //find school to update
    const school = data.schools.find(school => school.id == id);
    //update properties
    school.name = name;
    school.sigla = sigla;
    school.morada = morada;
    school.website = website;
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return updated school
    return res.send({id, name, sigla, school });
}

//delete school by his id (school number)
exports.delete = async (req, res) => {
    //get school id requested
    const id = req.params.number;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //find school to delete
    const school = data.schools.filter(school => school.id == id);
    //delete school
    data.schools.splice(school, 1);
    //update local database
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //return ok
    return res.status(200).send("ok");
}

//return all schools
exports.getAll = async (req, res) => {

    console.log("entrou");

    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //returns school array
    return res.send(data.schools);
}

//return school by his id (schools id)
exports.getById = async (req, res) => {
    //get course id requested
    const id = req.params.id;
    //read local data json file
    const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
    //parse to json
    const data = JSON.parse(datajson);
    //finds school by his id
    const school = data.schools.filter(school => school.id == id);
    //return schools
    res.send(school);
}