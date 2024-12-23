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
    if (req.user) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json(errors);
      }
      await prisma.folder.create({
        data: {
          name: req.body.folderCreate,
          owner: {
            connect: { id: req.user.id },
          },
        },
      });
      // res.redirect(req.get('referer'));
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  }),
];

exports.readFolder = asyncHandler(async (req, res) => {
  if (req.user) {
    const folders = await prisma.folder.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
      where: {
        owner: {
          is: { id: parseInt(req.user.id) },
        },
      },
    });
    const folder = await prisma.folder.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    const files = await prisma.file.findMany({
      orderBy: {
        name: "asc",
      },
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
  } else {
    res.redirect("/login");
  }
});

exports.editFolder = asyncHandler(async (req, res) => {
  if (req.user) {
    // TODO: Validate new folder name
    await prisma.folder.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.folderRename,
      },
    });
    res.redirect(`/folder/${req.params.id}`);
  } else {
    res.redirect("/login");
  }
});

exports.deleteFolder = asyncHandler(async (req, res) => {
  if (req.user) {
    await prisma.folder.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
