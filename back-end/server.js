const express = require("express");
const errMiddleware = require("./middleware/err.middleware");
const log = require("./middleware/log.middleware");
const Router = require("./routes/arquichive.routes");
const app = express();
const indexHTMLMiddleware = require("./middleware/indexHTML.middleware");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(log);
app.use("/", Router);
app.use(indexHTMLMiddleware);
app.use(errMiddleware);



app.listen(5000, () => {
    console.log("Server rodando na porta 5000");
});