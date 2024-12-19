require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const expressSession = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const app = express();
const upload = multer();

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloud upload
app.post(["/file/create"], upload.single("file"), async (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    res.locals.result = result;
  }
  await upload(req);
  next();
});

// Delete from Cloudinary
app.post(["/file/delete/:id"], async (req, res, next) => {
  cloudinary.uploader
    .destroy(req.body.publicId)
    .then((result) => console.log(result));
  next();
});


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
