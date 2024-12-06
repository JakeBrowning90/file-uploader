const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
// const LocalStrategy = require("passport-local").Strategy;
const validateUserForm = require("../middleware/validateUserForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getIndex = asyncHandler(async (req, res) => {
  res.render("index", { title: "File Uploader - Home" });
});

exports.getSignup = asyncHandler(async (req, res) => {
  res.render("signup", { title: "File Uploader - Signup" });
});

exports.postSignup = [
  validateUserForm,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    // If errors, rerender form and display errors
    if (!errors.isEmpty()) {
      res.render("signup", {
        title: "Sign Up",
        errors: errors.array(),
        fields: req.body,
      });
    } else {
      try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            res.redirect("/signup");
          } else {
            await prisma.user.create({
              data: {
                email: req.body.email,
                password: hashedPassword,
              },
            });
            const users = await prisma.user.findMany()
            console.log(users)
            res.redirect("/login");
          }
        });
      } catch (err) {
        return next(err);
      }
    }
  }),
];

exports.getLogin = asyncHandler(async (req, res) => {
  res.render("login", { title: "File Uploader - Login" });
});

exports.getAbout = asyncHandler(async (req, res) => {
  res.render("about", { title: "File Uploader - About" });
});
