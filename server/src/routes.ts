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
}