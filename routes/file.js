const express = require("express");
const router = express.Router();

const fileController = require("../controllers/fileController");

// Create file
router.post("/create", fileController.createFile);

// Read ALL files

// Read ONE file
router.get("/:id", fileController.readFile);

// Update file

// Delete file
router.post("/delete/:id", fileController.deleteFile);

module.exports = router;
