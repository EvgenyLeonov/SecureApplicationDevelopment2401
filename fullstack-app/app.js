const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'images')));

//this is Session. You may store your data inside.
app.use(session({
    store: new FileStore({}),
    secret: "xnrtej6381k",
    resave: false,
    saveUninitialized: false,
}));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        //cb(null, new Date().toISOString() + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single("dogPortrait")
);

app.use("/auth", require("./routes/auth"));

//for all incoming requests firstly do this
app.use((req, res, next) => {
    console.log("checking user...");
    if (!req.session.userName) {
        console.log("user is not logged in - redirecting");
        res.redirect("/auth/signup");
    }
    console.log("user = " + req.session.userName);
    next();
});

const searchRouter = require("./routes/search");

app.use("/", searchRouter);
app.use("/search", searchRouter);

app.listen(3000);