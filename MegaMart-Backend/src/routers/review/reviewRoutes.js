const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");

const {
    createReview,
} = require("../../controllers/review/reviewController");


router.post(
    "/create",
    Protect,
    createReview,
);

module.exports = router;