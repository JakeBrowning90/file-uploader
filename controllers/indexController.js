const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const validateUserForm = require("../middleware/validateUserForm");

exports.getIndex = asyncHandler(async (req, res) => {
  res.render("index", { title: "File Uploader - Home" });
});

exports.getSignup = asyncHandler(async (req, res) => {
  res.render("signup", { title: "File Uploader - Signup" });
});

exports.postSignup = [
  validateUserForm,
  asyncHandler(async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    // If errors, rerender form and display errors
    if (!errors.isEmpty()) {
      res.render("signup", {
        title: "Sign Up",
        errors: errors.array(),
        fields: req.body,
      });
    } 

    // res.render("signup", { title: "File Uploader - Signup" });
  })
]

exports.getLogin = asyncHandler(async (req, res) => {
  res.render("login", { title: "File Uploader - Login" });
});

exports.getAbout = asyncHandler(async (req, res) => {
  res.render("about", { title: "File Uploader - About" });
});
