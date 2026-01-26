const fs = require("fs");
const path = require("path");

const arqPath = path.join(__dirname, "..", "arquichive.json");

const getArquichive = async (req, res) => {  // Testado
    try {

        const data = await fs.promises.readFile(arqPath, "utf-8");
        res.status(200).json(JSON.parse(data));

        if (!data) {
            res.status(404).json({ message: "Arquichive nao encontrado" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const getIdArquichive = async (req, res) => {  // Testado
    try {

        const data = await fs.promises.readFile(arqPath, "utf-8");
        const arquichive = JSON.parse(data);

        if (!data) {
            res.status(404).json({ message: "Arquichive nao encontrado" });
        }

        res.status(200).json(arquichive);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const createArquichive = async (req, res) => {
    try {
        const arquichive = req.body;

        if (!arquichive || Object.keys(arquichive).length === 0) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        const arquichiveData = await fs.promises.readFile(arqPath, "utf-8");
        const arquichiveObject = JSON.parse(arquichiveData);

        arquichive.id = Date.now().toString();
        arquichiveObject.push(arquichive);

        await fs.promises.writeFile(
            arqPath,
            JSON.stringify(arquichiveObject, null, 2)
        );

        return res.status(201).json(arquichive);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar arquichive" });
    }
}

const updateArquichive = async (req, res) => {
    try {

        const { id } = req.params;
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Corpo da requisição vazio" });
        }

        const data = await fs.promises.readFile(arqPath, "utf-8");
        const arquichiveObject = JSON.parse(data);

        const index = arquichiveObject.findIndex(
            item => String(item.id) === id
        );

        if (index < 0) {
            return res.status(404).json({ message: "Arquichive não encontrado para atualização" });
        }


        arquichiveObject[index] = { ...arquichiveObject[index], ...updates, id: arquichiveObject[index].id };

        await fs.promises.writeFile(
            arqPath,
            JSON.stringify(arquichiveObject, null, 2)
        );

        res.status(200).json(arquichiveObject[index]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}


const deleteArquichive = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await fs.promises.readFile(arqPath, "utf-8");
        const arquichiveObject = JSON.parse(data);

        const index = arquichiveObject.findIndex(
            item => String(item.id) === id
        );

        if (index < 0) {
            return res.status(404).json({ message: "Arquichive não encontrado para exclusão" });
        }

        arquichiveObject.splice(index, 1);

        await fs.promises.writeFile(
            arqPath,
            JSON.stringify(arquichiveObject, null, 2)
        );


        res.status(204).send();

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

