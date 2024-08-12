import disciplina from "../models/Disciplina.mjs"

const disciplinaController = {

    "new": async (req, res) => {
        const created = await disciplina.create({
            nome: req.body.nome,
            professor: req.body.professor,
            cargaH: req.body.cargaH,
            requisito: req.body.requisito,
            sala: req.body.sala
        })
        res.send(created)
    },

    "one": async (req, res) => {
        const v = await disciplina.findOne({
            where: { id: req.params.id }
        })
        res.json(v)
    },

    "all": async (req, res) => {
        res.json(await disciplina.findAll())

    },

    "edit": async (req, res) => {
        const v = await disciplina.findOne({
            where: { id: req.body.id }
        })
        v.nome = req.body.nome,
            v.professor = req.body.professor,
            v.cargaH = req.body.cargaH,
            v.requisito = req.body.requisito,
            v.sala = req.body.sala

        await v.save()
        res.json(v)
    },

    "remove": async (req, res) => {
        try {
            const v = await disciplina.findOne({
                where: { id: req.body.id }
            });
            if (v) {
                await v.destroy();
                res.json({ message: "Disciplina removido com sucesso" });
            } else {
                res.status(404).json({ error: "Disciplina não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao remover disciplina:", error);
            res.status(500).json({ error: "Erro ao remover disciplina" });
        }
    }
}

export default disciplinaController