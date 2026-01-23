const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {

    res.json({
        message: "Hello World"
    });
});

app.listen(3000, () => {
    console.log("Server rodando na porta 3000");
});