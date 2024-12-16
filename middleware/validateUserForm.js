const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateUserForm = [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email address format.")
      .isLength({ min: 1, max: 50 })
      .withMessage("Email must contain between 1 and 50 characters.")
      .custom(async (value) => {
        const existingUsername = await prisma.user.findUnique({
          where: {
            email: value,
          },
        });
        if (existingUsername) {
          throw new Error("Username already in use.");
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("Password must contain between 1 and 20 characters."),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Typed passwords do not match."),
  ];
  
  module.exports = validateUserForm;