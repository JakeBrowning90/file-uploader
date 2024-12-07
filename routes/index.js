const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// GET homepage
router.get("/", indexController.getIndex);

// GET signup
router.get("/signup", indexController.getSignup);

// POST signup
router.post("/signup", indexController.postSignup);

// GET login
router.get("/login", indexController.getLogin);

// POST login
router.post("/login", indexController.postLogin);

// GET logout
router.get("/logout", indexController.getLogout);

// GET about
router.get("/about", indexController.getAbout);

module.exports = router;
