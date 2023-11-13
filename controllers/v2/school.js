const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//creates school
exports.create = async (req, res) => {
  //get requested course properties
  const { number, name, morada, website } = req.body;
  if (!number || !name || !morada || !website)
    return res.status(400).send("Dados inválidos!");
  try {
    //creates new course
    const school = await prisma.schools.create({
      data: {
        number: number,
        name: name,
        morada: morada,
        website: website,
      },
    });
    //return school created
    res.status(201).json(school);
  } catch (error) {
    if (error.code == "P2002")
      return res.status(404).send("escolas já existe!");
    res.status(400).json({ msg: error.message });
  }
};

//updates school
exports.update = async (req, res) => {
  const { number, name, morada, website } = req.body;
  if (!number || !name || !morada || !website)
    return res.status(400).send("Dados inválidos!");
  try {
    const school = await prisma.schools.update({
      where: {
        number: number,
      },
      data: {
        name: name,
        morada: morada,
        website: website,
      },
    });
    //return school updated
    res.status(200).json(school);
  } catch (error) {
    if (error.code == "P2025")
      return res.status(404).send("escola não existe!");
    res.status(400).json({ msg: error.message });
  }
};

//delete school by his id (svhool number)
exports.delete = async (req, res) => {
  //get course number requested
  const number = req.params.number;
  try {
    //aqui acontece o mesmo que no update
    await prisma.schools.delete({
      where: {
        number: number,
      },
    });
    //just return ok
    res.status(200).send("ok");
  } catch (error) {
    if (error.code == "P2025") return res.status(404).send("Curso não existe!");
    res.status(400).json({ msg: error.message });
  }
};

//return all schools
exports.getAll = async (req, res) => {
  try {
    const response = await prisma.schools.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//return school by his id (schools id)
exports.getById = async (req, res) => {
  //get course id requested
  const id = req.params.number;
  console.log(id);
  try {
    //finds course by his id (number)
    const school = await prisma.schools.findUnique({
      where: {
        number: id,
      },
    });
    return res.status(200).json(school);
  } catch (error) {
    if (error.code == "P2025") return res.status(404).send("Curso não existe!");
    res.status(404).json({ msg: error.message });
  }
};
