const Pool = require("../models/db.model")

const getArquichive = async (req, res) => {  // Testado
    try {

        const archive = await Pool.query("SELECT * FROM entries ORDER BY name ASC");

        if (archive.rowCount === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(archive.rows)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const getIdArquichive = async (req, res) => {  // Testado
    try {

        const archive = await Pool.query("SELECT * FROM entries WHERE id = $1", [req.params.id]);

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

        const result = await Pool.query(
            `INSERT INTO entries (name, type, danger_level, description)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, type, danger_level, description]
        );


        res.status(201).send(result.rows[0]);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar arquichive" });
    }
}

const updateArquichive = async (req, res) => {
    try {

        const { name, type, danger_level, description } = req.body;

        const result = await Pool.query(
            `UPDATE entries
             SET name = $1,
                 type = $2,
                 danger_level = $3,
                 description = $4
             WHERE id = $5
             RETURNING *`,
            [name, type, danger_level, description, req.params.id]
        );

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

        const result = await Pool.query("DELETE FROM entries WHERE id = $1", [req.params.id]);

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

