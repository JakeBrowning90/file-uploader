const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateFolderForm = [
  body("folderCreate")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Folder name must contain between 1 and 20 characters.")
    .custom(async (value) => {
      const existingFolder = await prisma.folder.findUnique({
        where: { name: value },
      });
      if (existingFolder) {
        throw new Error("Folder name already in use.");
      }
    }),
];

module.exports = validateFolderForm;
