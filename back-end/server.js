const express = require("express");
const errMiddleware = require("./middleware/err.middleware");
const log = require("./middleware/log.middleware");
const Router = require("./routes/arquichive.routes");
const path = require("path");
const app = express();

app.use(express.json());
app.use(log);
app.use("/", Router);
app.use(express.static(path.join(__dirname, "public")));
app.use(errMiddleware);


app.listen(5000, () => {
    console.log("Server rodando na porta 5000");
});