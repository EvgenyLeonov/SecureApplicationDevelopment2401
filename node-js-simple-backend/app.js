const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const hashHelper = require("./hashing");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use((req, res, next) => {
    // Attach CORS headers
    // Required when using a detached backend (that runs on a different domain)
    //* -- means all
    res.setHeader("Access-Control-Allow-Origin", "*");
    //from this site only
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/health", (req, res, next) => {
    res.send("<h1>Service is OK</h1>");
});

app.post("/login-redirect", (req, res, next) => {
    const name = req.body.login;
    res.send(`<h1>Hello, ${name}!</h1>`);
});

app.post("/login", (req, res, next) => {
    const name = req.body.login;
    const password = req.body.password;

    //let's say we have password = 123abc
    const passwordInDatabase = "123abc";
    const hashPasswordInDatabase = hashHelper.hash(passwordInDatabase);
    //
    const passwordsMatch = hashHelper.isMatch(password, hashPasswordInDatabase);
    //
    res.json({userName: name, match: passwordsMatch});
});

app.listen(3001);