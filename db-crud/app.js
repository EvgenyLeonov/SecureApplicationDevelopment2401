const express = require("express");

require("dotenv").config({path: ".env.local", override: true});
const {DAO} = require("./dao/DAO");

const app = express();


//console.log(process.env);
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

app.get("/demo", async (req, res) => {
    console.log("db operations...");
    const dbCredentials = {
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    };
    const dao = new DAO(dbCredentials);
    dao.printCredentials();
    const rows = await dao.executeQuery("select id, name from app.animals", []);
    console.log("rows:", rows)
    res.json({rows_count: rows.length, first_row: rows.length > 0 ? rows[0] : null});
});

app.listen(3001);





