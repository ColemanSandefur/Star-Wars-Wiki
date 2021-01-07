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

import {StarWarsApiCache} from "./starWarsApiCache"

StarWarsApiCache.loadAPI().then(() => {
    console.log(Object.keys(StarWarsApiCache.people).length, Object.keys(StarWarsApiCache.planets).length);
    console.log(StarWarsApiCache.people[1]);
});

// // requests to this server goes to routes.ts
import routes from "./routes"
import { umask } from "process";
routes(app);

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
});


