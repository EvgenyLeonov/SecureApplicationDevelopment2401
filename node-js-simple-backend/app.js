const express = require("express");
const app = express();
const path = require("path");
const {Log}  = require("../node-js-simple-backend/helpers/logging");

//for logging
const rootPath = path.dirname(process.mainModule.filename);
const logsPath = path.join(rootPath, "logs");
const logFilePath = path.join(logsPath, "log.txt");
const logger = new Log(logFilePath);

//for user input check
const {check, query, body, validationResult} = require("express-validator");

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
    logger.log("call health");
    res.send("<h1>Service is OK</h1>");
});

app.post("/login-redirect", (req, res, next) => {
    const name = req.body.login;
    res.send(`<h1>Hello, ${name}!</h1>`);
});

//this is mandatory functionality
//you mustn't leave user data in without validation & sanitizing
app.post("/input-validation",
    body("login").not().isEmpty().escape(),
    body("email").trim().isEmail(),
    body(["password1", "password2"]).not().isEmpty().isLength({min: 10}),
    check("password1", "invalid password")
        .custom((value, {req, loc, path}) => {
            if (value !== req.body.password2) {
                throw new Error("password1 and password2 must match");
            } else {
                return value;
            }
        }),
    (req, res) => {
        let login = req.body.login;
        const errors = validationResult(req);
        res.send(`<h6>Login: ${login} Errors: ${JSON.stringify(errors)}</h6>`);
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