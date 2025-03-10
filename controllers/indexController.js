const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const validateUserForm = require("../middleware/validateUserForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

exports.getIndex = asyncHandler(async (req, res) => {
  if (req.user) {
    const query = req.query.searchValue;

    // Only display files/folders for current user
    const folders = await prisma.folder.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        owner: {
          is: { id: parseInt(req.user.id) },
        },
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const files = await prisma.file.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        owner: {
          is: { id: parseInt(req.user.id) },
        },
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const allFolders = await prisma.folder.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        owner: {
          is: { id: parseInt(req.user.id) },
        },
      },
    });

    res.render("index", {
      title: "File Uploader - Home",
      query: query,
      allFolders: allFolders,
      folders: folders,
      files: files,
    });
  } else {
    // Redirect to login if no current user
    res.redirect("/login");
  }
});

exports.getSignup = asyncHandler(async (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { title: "File Uploader - Signup" });
  }
});

exports.postSignup = [
  validateUserForm,
  asyncHandler(async (req, res) => {
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
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { title: "File Uploader - Login" });
  }
});

exports.postLogin = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "login",
  }),
];

exports.getLogout = asyncHandler(async (req, res) => {
  if (req.user) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

exports.getAbout = asyncHandler(async (req, res) => {
  res.render("about", { title: "File Uploader - About" });
});
