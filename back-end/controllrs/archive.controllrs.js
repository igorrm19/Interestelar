const fs = require("fs");

const getArquichive = async (req, res) => {  // Testado
    try {

        const data = await fs.promises.readFile("arquichive.json", "utf-8");
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

        const data = await fs.promises.readFile("arquichive.json", "utf-8");
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

        const arquichiveData = await fs.promises.readFile("arquichive.json", "utf-8");
        const arquichiveObject = JSON.parse(arquichiveData);

        arquichive.id = Date.now().toString();
        arquichiveObject.push(arquichive);

        await fs.promises.writeFile(
            "arquichive.json",
            JSON.stringify(arquichiveObject, null, 2)
        );

        if (!arquichive) {
            res.status(404).json({ message: "Arquichive não encontrado" });
        }

        res.status(201).json(arquichive);


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}

const updateArquichive = async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar arquichive" });
    }
}

const deleteArquichive = async (req, res) => {
    try {

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

