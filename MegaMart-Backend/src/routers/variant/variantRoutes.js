const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");
const upload = require("../../middlewares/uploadMiddleware");


const {
    createVariant,

  getProductVariants,

  setDefaultVariant,
} = require("../../controllers/variant/variantController");



// create router
router.post(
     "/create/:productId",
     protect,
     seller,
     upload.array("images", 5),
     createVariant,
);


// get Router

router.get(
      "/product/:productId",
      getProductVariants
);


router.put(
    "/default/:variantId",
    protect,
    seller,
    setDefaultVariant,
);


module.exports = router;

