const Pool = require("../models/db.model");
const Entries = require("../models/entries.model");


const getArquichive = async (req, res) => {
    try {

        const archive = await Entries.getEntries();

        if (archive.rowCount === 0) {
            return res.status(200).json([]);
        }


        res.status(200).json(archive.rows)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const getIdArquichive = async (req, res) => {
    try {

        const archive = await Entries.getEntryById(req.params.id);

        if (archive.rowCount === 0) {
            return res.status(404).send({ message: "Archive não encontrado" });
        }

        res.status(200).json(archive.rows)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const createArquichive = async (req, res) => {
    try {
        const { name, type, danger_level, description } = req.body;

        const result = await Entries.createEntry({ name, type, danger_level, description });


        res.status(201).send(result.rows[0]);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar arquichive" });
    }
}

const updateArquichive = async (req, res) => {
    try {

        const { name, type, danger_level, description } = req.body;

        const result = await Entries.updateEntry(req.params.id, { name, type, danger_level, description });

        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Archive não atualizado" });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const deleteArquichive = async (req, res) => {
    try {

        const result = await Entries.deleteEntry(req.params.id);

        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Archive não deletado" });
        }

        res.status(204).send("Archive deletado com sucesso");

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


module.exports = {
    getArquichive,
    getIdArquichive,
    createArquichive,
    updateArquichive,
    deleteArquichive
};

