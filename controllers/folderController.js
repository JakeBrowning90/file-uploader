const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// TODO: validateFolderForm
// const validateFolderForm = require("../middleware/validateFolderForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createFolder = asyncHandler(async (req, res) => {
  await prisma.folder.create({
    data: {
      name: req.body.folderCreate,
      owner: {
        connect: { id: req.user.id },
      },
    },
  });
  res.redirect("/");
});

exports.readFolder = asyncHandler(async (req, res) => {
  const folder = await prisma.folder.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.render("folderDetail", {
    title: "Folder Detail",
    folder: folder,
  });
});

exports.deleteFolder = asyncHandler(async (req, res) => {
  await prisma.folder.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  console.log("Folder deleted!");
  res.redirect("/");
});
