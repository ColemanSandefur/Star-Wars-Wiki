import express from 'express'
import {StarWarsApiCache} from "./starWarsApiCache"

export default (app: express.Express) => {
    app.get("/", (req, res) => {
        res.send({
            message: "Hello world!"
        });
    });

    app.post("/test", (req, res) => {
        res.send({
            message: `Hello ${req.body.name} you are now registered! Have fun!`
        });
    });

    app.get("/linkBar", (req, res) => {
        res.send([
            {name: "people", link: "/people"},
            {name: "planets", link: "/planets"},
            {name: "films", link: "/films"},
            {name: "species", link: "/species"},
            {name: "vehicles", link: "/vehicles"},
            {name: "starships", link: "/starships"}
        ]);
    });

    app.get("/people/:id", (req, res) => {
        let id = <number><any>req.params.id;
        console.log(id);
        res.send(StarWarsApiCache.people[id]);
    });

    app.get("/planets/:id", (req, res) => {
        let id = <number><any>req.params.id;
        console.log(id);
        res.send(StarWarsApiCache.planets[id]);
    })

    app.get("/films/:id", (req, res) => {
        let id = <number><any>req.params.id;
        console.log(id);
        res.send(StarWarsApiCache.films[id]);
    })
}