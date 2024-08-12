import disciplina from "../models/Disciplina.mjs";
import Curso from "../models/Curso.mjs";

const CursoController = Object.create(Object.prototype);

CursoController.new = async (req, res) => {
    const created = await Curso.create({
        DisciplinaId: req.body.DisciplinaId, 
        nomeC: req.body.nomeC, 
        reitorC: req.body.reitorC, 
        tipo: req.body.tipo
    });
    res.json(created);
};

CursoController.one = async (req, res) => {
    const l = await Curso.findOne({
        where: { id: req.params.id }
    });
    res.json(l);
};

CursoController.all = async (req, res) => {
    const all = await Curso.findAll();
    const ret = [];
    for (let i = 0; i < all.length; i++) {
        ret.push({
            ...all[i].dataValues,
            disciplina: await all[i].getDisciplina()
        });     
    }
    res.json(ret);
};

CursoController.edit = async (req, res) => {
    const l = await Curso.findOne({
        where: { id: req.body.id }
    });
    l.nomeC = req.body.nomeC;
    l.reitorC = req.body.reitorC;
    l.tipo = req.body.tipo;
    await l.save();
    res.json(l);
};

CursoController.remove = async (req, res) => {
    const l = await Curso.findOne({
        where: { id: req.body.id }
    });
    await l.destroy();
    res.json(l);
};

export default CursoController;
