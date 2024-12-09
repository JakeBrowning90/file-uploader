const express = require("express");
const router = express.Router();

const folderController = require("../controllers/folderController");

// Create folder GET

// Create folder POST
router.post("/create", folderController.createFolder);

// Read folder - Open Folder and display files 
router.get("/:id", folderController.readFolder);

// Update folder

// Delete folder
router.post("/delete/:id", folderController.deleteFolder);

module.exports = router;