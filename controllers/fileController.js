const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// TODO: validateFileForm
// const validateFileForm = require("../middleware/validateFileForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TODO: check authentication for path
exports.createFile = asyncHandler(async (req, res) => {
  await prisma.file.create({
    data: {
      name: req.file.filename,
      size: req.file.size,
      url: req.file.path,
      folder: {
        connect: req.body.folderSelect?.map((c) => ({ id: parseInt(c) })) || [],
      },
      owner: {
        connect: { id: req.user.id },
      },
    },
  });
  res.redirect("/");
});

exports.readFile = asyncHandler(async (req, res) => {
  const file = await prisma.file.findUnique({
    include: {
      folder: true,
    },
    where: { id: parseInt(req.params.id) },
  });
  // console.log(file)
  const folders = await prisma.folder.findMany();
  res.render("fileDetail", {
    title: "File Detail",
    file: file,
    folders: folders,
  });
});

exports.deleteFile = asyncHandler(async (req, res) => {
  await prisma.file.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  console.log("File deleted!");
  res.redirect("/");
});
