import express from "express";
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors";
import config from "./config/config";

//express application
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// // requests to this server goes to routes.ts
import routes from "./routes"
routes(app);

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
});


