const asyncHandler = require("express-async-handler");

exports.getIndex = asyncHandler(async (req, res) => {
  res.render("index", { title: "File Uploader" });
});
