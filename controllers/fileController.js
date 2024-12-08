const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// TODO: validateFileForm
// const validateFileForm = require("../middleware/validateFileForm");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createFile = asyncHandler(async (req, res) => {
  console.log("File created");
  console.log(req.file);
  console.log(req.user);

  await prisma.file.create({
    data: {
      name: req.file.filename,
      size: req.file.size,
      url: req.file.path,
      owner: {
        connect: { id: req.user.id },
      },
    },
  });
  res.redirect("/");
});
