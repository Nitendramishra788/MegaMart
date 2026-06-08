const protect = require("../../middlewares/authMiddleware");
const express =  require("express");
const  {seller}= require("../../middlewares/sellerMiddleware");

const router = express.Router();

const {
     applySeller,
} = require("../../controllers/seller/sellerController");

router.post("/apply", protect, applySeller);

router.get(
  "/dashboard",
  protect,
  seller,
  (req, res) => {

    res.status(200).json({
      success: true,
      message: "Welcome Seller Dashboard",
    });

  }
);



module.exports = router;