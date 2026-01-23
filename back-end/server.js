const express = require("express");
const errMiddleware = require("./middleware/err.middleware");
const log = require("./middleware/log.middleware");
const app = express();

app.use(express.json());
app.use(log);
app.use(errMiddleware);

app.get("/", (req, res) => {

    res.json({
        message: "Hello World"
    });
});

app.listen(5000, () => {
    console.log("Server rodando na porta 3000");
});