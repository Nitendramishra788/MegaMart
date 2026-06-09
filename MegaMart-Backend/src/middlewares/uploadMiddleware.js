const multer = require("multer");

const path = require("path");

const fs = require("fs");


// storage config
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let folder = "src/uploads/others";

    // USER AVATAR
    if (file.fieldname === "avatar") {

      folder = "src/uploads/users";

    }

    // STORE IMAGES
    else if (
      file.fieldname === "storeLogo" ||
      file.fieldname === "storeBanner"
    ) {

      folder = "src/uploads/stores";

    }

    // PRODUCT IMAGES
    else if (file.fieldname === "images") {

      folder = "src/uploads/products";

    }

    // auto create folder
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },


  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );

  },

});


const upload = multer({ storage });

module.exports = upload;