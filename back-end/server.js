// psql -U postgres

const express = require("express");
const errMiddleware = require("./middleware/err.middleware");
const log = require("./middleware/log.middleware");
const Router = require("./routes/arquichive.routes");
const app = express();
const indexHTMLMiddleware = require("./middleware/indexHTML.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const cors = require("cors");

const PORT = 5000;

app.use(cors(
    {
        origin: "http://localhost:5000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
));
app.use(express.json());
app.use(express.static("public"));
app.use(log);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", Router);
app.use(indexHTMLMiddleware);
app.use(errMiddleware);



app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});