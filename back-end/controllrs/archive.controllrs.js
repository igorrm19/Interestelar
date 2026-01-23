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


const postArquichive = (req, res) => {
    res.json({
        message: "Hello World"
    });
}

const putArquichive = (req, res) => {
    res.json({
        message: "Hello World"
    });
}

const deleteArquichive = (req, res) => {
    res.json({
        message: "Hello World"
    });
}


module.exports = {
    getArquichive,
    getIdArquichive,
    postArquichive,
    putArquichive,
    deleteArquichive
};

