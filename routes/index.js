const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// GET homepage
router.get("/", indexController.getIndex);

// GET signup
router.get("/signup", indexController.getSignup);

// POST signup

// GET login
router.get("/login", indexController.getLogin);

// POST login

// GET about
router.get("/about", indexController.getAbout);

module.exports = router;
