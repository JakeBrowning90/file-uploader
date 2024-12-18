const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// TODO: validateFileForm
// const validateFileForm = require("../middleware/validateFileForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TODO: check authentication for path
exports.createFile = asyncHandler(async (req, res) => {

  // console.log(req.file)
  // console.log(res.locals.result)

  if (req.user) {
    if (
      !Array.isArray(req.body.folderSelect) &&
      req.body.folderSelect != undefined
    ) {
      req.body.folderSelect = [req.body.folderSelect];
    }
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: res.locals.result.secure_url,
        folder: {
          ...(req.body.folderSelect
            ? {
                connect: req.body.folderSelect?.map((c) => ({
                  id: parseInt(c),
                })),
              }
            : []),
        },
        owner: {
          connect: { id: req.user.id },
        },
      },
    });
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

exports.readFile = asyncHandler(async (req, res) => {
  if (req.user) {
    const file = await prisma.file.findUnique({
      include: {
        folder: true,
      },
      where: { id: parseInt(req.params.id) },
    });
    const folders = await prisma.folder.findMany({
      where: {
        owner: {
          is: { id: parseInt(req.user.id) },
        },
      },
    });
    res.render("fileDetail", {
      title: "File Detail",
      file: file,
      folders: folders,
    });
  } else {
    res.redirect("/login");
  }
});

exports.editFile = asyncHandler(async (req, res) => {
  if (req.user) {
    if (
      !Array.isArray(req.body.folderUpdate) &&
      req.body.folderUpdate != undefined
    ) {
      req.body.folderUpdate = [req.body.folderUpdate];
    }
    // Change file's folders
    await prisma.file.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        folder: {
          set: [],
        },
      },
    });

    await prisma.file.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        folder: {
          connect:
            req.body.folderUpdate?.map((c) => ({ id: parseInt(c) })) || [],
        },
      },
    });
    res.redirect(`/file/${req.params.id}`);
  } else {
    res.redirect("/login");
  }
});

exports.deleteFile = asyncHandler(async (req, res) => {
  if (req.user) {
    await prisma.file.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    console.log("File deleted!");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
