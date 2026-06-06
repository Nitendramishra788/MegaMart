const multer = require  ("multer");
const path = require("path");

// Set up storage engine for multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/users");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});



const upload = multer({storage:storage});

module.exports = upload;