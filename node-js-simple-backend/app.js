const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use((req, res, next) => {
    // Attach CORS headers
    // Required when using a detached backend (that runs on a different domain)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/health", (req, res, next) => {
    res.send("<h1>Service is OK</h1>");
});

app.post("/login", (req, res, next) => {
    const name = req.body.login;
    res.send(`<h1>Hello, ${name}!</h1>`);
});

app.listen(3000);