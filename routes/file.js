const express = require("express");
const router = express.Router();

const fileController = require("../controllers/fileController");

// Create file
router.post("/create", fileController.createFile);

// Read file

// Update file

// Delete file

module.exports = router;
