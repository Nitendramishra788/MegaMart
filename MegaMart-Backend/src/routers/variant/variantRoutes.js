const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");
const upload = require("../../middlewares/uploadMiddleware");


const {
    createVariant,

  getProductVariants,

  setDefaultVariant,

  updateVariant,

  deleteVariant,
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

// update variant router

router.put(
  "/update/:variantId",
  protect,
  seller,
  upload.array("images", 5),
  updateVariant,

);


router.put(
    "/default/:variantId",
    protect,
    seller,
    setDefaultVariant,
);


router.delete(

    "/delete/:variantId",

    protect,

    seller,

    deleteVariant

);


module.exports = router;

