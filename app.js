const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
// const fileRouter = require("./routes/file")

app.use("/", indexRouter);

const path = require("node:path");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("*", (req, res, next) => {
  res.render("404", { title: "404 Error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
