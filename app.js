const express = require("express");
const multer = require("multer");

const expressSession = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const app = express();
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  expressSession({
    cookie: {
      maxAge: 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/files/')
)},
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// // const upload = multer({ dest: path.join(__dirname, 'uploads/') });
const upload = multer({ storage: storage });
app.post(['/file/create/'], upload.single('file'), function (req, res, next) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
  next();
})

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routers
const indexRouter = require("./routes/index");
const fileRouter = require("./routes/file");
const folderRouter = require("./routes/folder");

app.use("/", indexRouter);
app.use("/file", fileRouter);
app.use("/folder", folderRouter);

app.get("*", (req, res, next) => {
  res.render("404", { title: "404 Error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
