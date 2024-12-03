const asyncHandler = require("express-async-handler");

exports.getIndex = asyncHandler(async (req, res) => {
  res.render("index", { title: "File Uploader - Home" });
});

exports.getSignup = asyncHandler(async (req, res) => {
  res.render("signup", { title: "File Uploader - Signup" });
});

exports.getLogin = asyncHandler(async (req, res) => {
  res.render("login", { title: "File Uploader - Login" });
});

exports.getAbout = asyncHandler(async (req, res) => {
  res.render("about", { title: "File Uploader - About" });
});