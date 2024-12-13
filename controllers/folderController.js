const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// TODO: validateFolderForm
const validateFolderForm = require("../middleware/validateFolderForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createFolder = [
  // TODO: Validate folder name
  validateFolderForm,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
    console.log(errors)
    }
    await prisma.folder.create({
      data: {
        name: req.body.folderCreate,
        owner: {
          connect: { id: req.user.id },
        },
      },
    });
    res.redirect("/");
  }),
];

exports.readFolder = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  }
  const folders = await prisma.folder.findMany();
  const folder = await prisma.folder.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  const files = await prisma.file.findMany({
    where: {
      folder: {
        some: { id: parseInt(req.params.id) },
      },
    },
  });
  res.render("folderDetail", {
    title: "Folder Detail",
    folders: folders,
    folder: folder,
    files: files,
  });
});

exports.editFolder = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  }
  // TODO: Validate new name
  await prisma.folder.update({
    where: { id: parseInt(req.params.id) },
    data: {
      name: req.body.folderRename,
    },
  });
  res.redirect(`/folder/${req.params.id}`);
});

exports.deleteFolder = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  }
  await prisma.folder.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.redirect("/");
});
