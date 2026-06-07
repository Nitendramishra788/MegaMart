const protect = require("../../middlewares/authMiddleware");
const express =  require("express");

const router = express.Router();

const {
     applySeller,
} = require("../../controllers/seller/sellerController");

router.post("/apply", protect, applySeller);


module.exports = router;