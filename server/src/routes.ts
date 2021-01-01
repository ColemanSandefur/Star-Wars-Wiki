import express from 'express'

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

    app.get("/people/:person_id", (req, res) => {
        let person_id = <number><any>req.params.person_id;
        console.log(person_id);
        res.send({
            "name": "Luke Skywalker", 
            "height": "172", 
            "mass": "77", 
            "hair color": "blond", 
            "skin color": "fair", 
            "eye color": "blue", 
            "birth year": "19BBY", 
            "gender": "male", 
            "homeworld": "http://swapi.dev/api/planets/1/", 
            "films": [
                "http://swapi.dev/api/films/1/", 
                "http://swapi.dev/api/films/2/", 
                "http://swapi.dev/api/films/3/", 
                "http://swapi.dev/api/films/6/"
            ], 
            "species": [], 
            "vehicles": [
                "http://swapi.dev/api/vehicles/14/", 
                "http://swapi.dev/api/vehicles/30/"
            ], 
            "starships": [
                "http://swapi.dev/api/starships/12/", 
                "http://swapi.dev/api/starships/22/"
            ], 
            "created": "2014-12-09T13:50:51.644000Z", 
            "edited": "2014-12-20T21:17:56.891000Z", 
            "url": "http://swapi.dev/api/people/1/"
        });
    })
}